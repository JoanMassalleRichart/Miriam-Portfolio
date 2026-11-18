import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

const SLIDE_INTERVAL = 5000

const HERO_IMAGES = [
  'hero-bg.jpg',
  'projects/180/06.jpg',
  'projects/dolcim/07.jpg',
  'projects/Solfeu Sound/01.jpg',
  'projects/Arcadia/07.jpg',
  'projects/Fukuruku/01.jpg',
  'projects/vozatenta/08.jpg',
]

const SOCIAL_LINKS = [
  {
    href: 'https://www.behance.net/mementodesign',
    icon: 'bi-behance',
    label: 'Behance',
  },
  {
    href: 'https://www.instagram.com/memento_design.ig/',
    icon: 'bi-instagram',
    label: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com/in/miriam-belmonte-trasierras-61595538b/',
    icon: 'bi-linkedin',
    label: 'LinkedIn',
  },
]

export default function Hero() {
  const typedRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const previousSlide = (activeSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(
      () => setActiveSlide((i) => (i + 1) % HERO_IMAGES.length),
      SLIDE_INTERVAL,
    )
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Graphic Design', 'Branding', 'Packaging'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
    return () => typed.destroy()
  }, [])

  return (
    <section id="hero" className="hero section light-background">
      <div className="hero-slides" aria-hidden="true">
        {HERO_IMAGES.map((file, i) => (
          <img
            key={file}
            src={`${import.meta.env.BASE_URL}assets/img/${encodeURI(file)}`}
            className={i === activeSlide ? 'is-active' : i === previousSlide ? 'is-previous' : ''}
            alt=""
          />
        ))}
      </div>

      <div className="container" data-aos="zoom-out">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="brand-title">
              <img src={`${import.meta.env.BASE_URL}assets/img/logo-mimontra.svg`} alt="mimontra" />
            </h1>
            <h2>Miriam Belmonte</h2>
            <p>
              <span ref={typedRef} />
            </p>
            <div className="social-links">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
