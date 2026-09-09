'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './glass-surface.css'

type GlassSurfaceProps = {
  children?: ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  opacity?: number
  blur?: number
  displace?: number
  backgroundOpacity?: number
  saturation?: number
  distortionScale?: number
  redOffset?: number
  greenOffset?: number
  blueOffset?: number
  xChannel?: 'R' | 'G' | 'B'
  yChannel?: 'R' | 'G' | 'B'
  mixBlendMode?: CSSProperties['mixBlendMode']
  className?: string
  style?: CSSProperties
}

export function GlassSurface({
  children,
  width = '100%',
  height = 48,
  borderRadius = 24,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1.15,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, '-')
  const filterId = `glass-filter-${uniqueId}`
  const redGradId = `red-grad-${uniqueId}`
  const blueGradId = `blue-grad-${uniqueId}`
  const [svgSupported, setSvgSupported] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null)

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    const actualWidth = rect?.width || 400
    const actualHeight = rect?.height || 80
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5)
    const innerWidth = Math.max(actualWidth - edgeSize * 2, 1)
    const innerHeight = Math.max(actualHeight - edgeSize * 2, 1)

    const svgContent = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="${actualWidth}" height="${actualHeight}" fill="black"/><rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/><rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edgeSize}" y="${edgeSize}" width="${innerWidth}" height="${innerHeight}" rx="${Math.max(borderRadius - edgeSize, 0)}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`
  }

  useEffect(() => {
    setSvgSupported(supportsSvgFilters(filterId))
  }, [filterId])

  useEffect(() => {
    const update = () => feImageRef.current?.setAttribute('href', generateDisplacementMap())
    update()
    const element = containerRef.current
    if (!element) return
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode, width, height])

  useEffect(() => {
    redChannelRef.current?.setAttribute('scale', String(distortionScale + redOffset))
    greenChannelRef.current?.setAttribute('scale', String(distortionScale + greenOffset))
    blueChannelRef.current?.setAttribute('scale', String(distortionScale + blueOffset))
    for (const ref of [redChannelRef, greenChannelRef, blueChannelRef]) {
      ref.current?.setAttribute('xChannelSelector', xChannel)
      ref.current?.setAttribute('yChannelSelector', yChannel)
    }
    gaussianBlurRef.current?.setAttribute('stdDeviation', String(displace))
  }, [distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, displace])

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`,
  } as CSSProperties

  return (
    <div ref={containerRef} className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`} style={containerStyle}>
      <svg className="glass-surface__filter" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0" />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  )
}

function supportsSvgFilters(filterId: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  const isFirefox = /Firefox/.test(navigator.userAgent)
  if (isWebkit || isFirefox) return false
  const div = document.createElement('div')
  div.style.backdropFilter = `url(#${filterId})`
  return div.style.backdropFilter !== ''
}

export default GlassSurface
