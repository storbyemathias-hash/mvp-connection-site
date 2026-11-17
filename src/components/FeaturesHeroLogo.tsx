import { LiquidGlassLogo } from './liquid-glass-logo';

/**
 * The ReactDrops Liquid Glass Logo with the project's own logo, as configured:
 * ending="logo" (finishes on the logo alone at normal size, no text reveal), height 480.
 * Only the colors are set to stay in the site's greyscale: a graphite plate and a
 * black page that matches the site background.
 */
export function FeaturesHeroLogo() {
  return (
    <LiquidGlassLogo
      logo="/logo.svg"
      ending="logo"
      tileColor="#0c0c0e"
      background="#050505"
      aria-label="MVP Connection logo"
      logoSize={136}
      style={{ height: 240 }}
    />
  );
}
