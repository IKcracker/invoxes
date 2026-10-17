"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Gem, Menu, X } from "lucide-react";
import { serviceLinks } from "@/lib/site-content";
import styles from "./public-shell.module.css";

const links = [
  ["About", "/about"],
  ["Finance solutions", "/services"],
  ["Calculators", "/calculator"],
  ["FAQs", "/faq"],
  ["Contact", "/contact"],
] as const;

/** One width policy for every public route; CRM layouts stay independent. */
function pageKind(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services/")) return "service";
  return pathname.split("/")[1] || "home";
}

export function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const servicesMenu = useRef<HTMLDetailsElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeNavigation = () => {
    setOpen(false);
    if (servicesMenu.current) servicesMenu.current.open = false;
  };

  return (
    <div className={`premium-site ${styles.root}`} data-page={pageKind(pathname)}>
      <div className={styles.notice}>
        <div className={styles.container}>
          Independent concept by Code Tech Agency. Not the official Lamna website.
        </div>
      </div>
      <header
        className={styles.header}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            const mobileWasOpen = open;
            const desktopWasOpen = servicesMenu.current?.open;
            closeNavigation();
            if (mobileWasOpen) toggle.current?.focus();
            else if (desktopWasOpen) servicesMenu.current?.querySelector("summary")?.focus();
          }
        }}
      >
        <div className={`${styles.container} ${styles.headerRow}`}>
          <Link href="/" className={styles.brand} aria-label="Lamna concept home" onClick={closeNavigation}>
            <span className={styles.brandIcon}><Gem size={20} aria-hidden="true" /></span>
            <span>lamna<span className={styles.brandDot}>.</span></span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {links.map(([label, href]) => href === "/services" ? (
              <details className={styles.servicesMenu} ref={servicesMenu} key={href}>
                <summary className={styles.navLink} data-active={isActive(href)}>
                  {label}<ChevronDown size={14} aria-hidden="true" />
                </summary>
                <div className={styles.dropdown}>
                  <Link href="/services" onClick={closeNavigation}>All finance solutions <ArrowRight size={15} aria-hidden="true" /></Link>
                  {serviceLinks.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeNavigation}
                      aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}>
                      {service.title}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={href} href={href} className={styles.navLink} data-active={isActive(href)}
                aria-current={pathname === href ? "page" : undefined} onClick={closeNavigation}>
                {label}
              </Link>
            ))}
          </nav>
          <div className={styles.desktopActions}>
            <Link href="/crm" className={styles.previewLink}>CRM preview <ArrowUpRight size={14} aria-hidden="true" /></Link>
            <Link href="/apply" className={styles.primaryButton}>Start application <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <button ref={toggle} type="button" className={styles.mobileToggle}
            aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}
            aria-controls="public-mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
        <nav id="public-mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation" hidden={!open}>
          <div className={styles.container}>
            {links.map(([label, href]) => (
              <div key={href}>
                <Link href={href} onClick={closeNavigation} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
                {href === "/services" && (
                  <details className={styles.mobileServices}>
                    <summary>Browse finance categories</summary>
                    {serviceLinks.map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeNavigation}>{service.title}</Link>
                    ))}
                  </details>
                )}
              </div>
            ))}
            <Link href="/crm" onClick={closeNavigation}>CRM preview</Link>
            <Link href="/apply" className={styles.primaryButton} onClick={closeNavigation}>Start application <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div>
            <Link href="/" className={styles.brand}>lamna<span className={styles.brandDot}>.</span></Link>
            <p>A considered specialist finance experience, from first enquiry to the next step.</p>
            <p className={styles.footerNote}>Independent concept. Not a live lending service.</p>
          </div>
          <div>
            <h2>Finance solutions</h2>
            {serviceLinks.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>)}
          </div>
          <div>
            <h2>Explore</h2>
            {[...links, ["Apply", "/apply"], ["CRM preview", "/crm"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
        </div>
        <div className={styles.footerLegal}>
          <p className={styles.container}>Fictional demonstration only. No official affiliation or real loan processing. Never enter real financial or identity information.</p>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const pathname = usePathname();
  const kind = pageKind(pathname);
  const brand = kind === "services" || kind === "service";
  const compact = ["calculator", "apply", "faq", "contact"].includes(kind);

  return (
    <section className={styles.intro} data-variant={brand ? "brand" : compact ? "compact" : "editorial"}>
      <div className={`${styles.container} ${styles.introContainer}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          {kind === "service" && <><Link href="/services">Finance solutions</Link><span aria-hidden="true">/</span></>}
          <span aria-current="page">{kind === "service" ? title : eyebrow}</span>
        </nav>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.introDescription}>{description}</p>
        {!compact && <div className={styles.introActions}>
          <Link href="/apply" className={brand ? styles.goldButton : styles.primaryButton}>Explore application <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link href="/calculator" className={styles.textButton}>Finance calculator <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>}
      </div>
    </section>
  );
}
