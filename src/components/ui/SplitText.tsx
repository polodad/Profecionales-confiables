'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: string
  from?: Record<string, any>
  to?: Record<string, any>
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onLetterAnimationComplete?: () => void
}

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const animationCompletedRef = useRef(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true)
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true)
      })
    }
  }, [])

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return
      const el = ref.current as any

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert()
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null
      }

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`
      const start = `top ${startPct}%${sign}`

      let targets: any[]
      const assignTargets = (self: any) => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines
        if (!targets) targets = self.chars || self.words || self.lines
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char'
      })

      assignTargets(splitInstance)
      
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true
          },
          onComplete: () => {
            animationCompletedRef.current = true
            onLetterAnimationComplete?.()
          }
        }
      )

      el._rbsplitInstance = splitInstance

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill()
        })
        try {
          splitInstance.revert()
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null
      }
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  )

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal' as const,
      wordWrap: 'break-word' as const
    }
    const classes = `split-parent ${className}`
    
    const commonProps = {
      ref,
      style,
      className: classes
    }

    switch (tag) {
      case 'h1':
        return <h1 {...commonProps}>{text}</h1>
      case 'h2':
        return <h2 {...commonProps}>{text}</h2>
      case 'h3':
        return <h3 {...commonProps}>{text}</h3>
      case 'h4':
        return <h4 {...commonProps}>{text}</h4>
      case 'h5':
        return <h5 {...commonProps}>{text}</h5>
      case 'h6':
        return <h6 {...commonProps}>{text}</h6>
      default:
        return <p {...commonProps}>{text}</p>
    }
  }
  
  return renderTag()
}

export default SplitText

