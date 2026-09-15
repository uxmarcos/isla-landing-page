import { Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import TrackingBootstrap from "@/components/TrackingBootstrap";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedOutlet from "@/components/AnimatedOutlet";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Isla — Your autonomous LinkedIn GTM" },
      { name: "description", content: "Isla identifies buyers already showing intent, nurtures every lead through real interactions, and moves them toward a booked call, while creating the content th" },
      { name: "author", content: "Lovable" },
      { name: "google-site-verification", content: "1y1I30j-32w6Tg79nRb6Utjg_QQ87BoL6mq5v2uyXp4" },
      { property: "og:title", content: "Isla — Your autonomous LinkedIn GTM" },
      { property: "og:description", content: "Isla identifies buyers already showing intent, nurtures every lead through real interactions, and moves them toward a booked call, while creating the content th" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Isla — Your autonomous LinkedIn GTM" },
      { name: "twitter:description", content: "Isla identifies buyers already showing intent, nurtures every lead through real interactions, and moves them toward a booked call, while creating the content th" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fQwIEuH8bceTnASIjoVCBPp0kM63/social-images/social-1785853840985-social-image.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/fQwIEuH8bceTnASIjoVCBPp0kM63/social-images/social-1785853840985-social-image.webp" },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem('isla-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
      },
      {
        children: `(function(){try{var p=new URLSearchParams(location.search);if(p.get('notrack')==='1'){localStorage.setItem('isla_notrack','1');console.log('[isla] tracking disabled for this browser');}if(p.get('notrack')==='0'){localStorage.removeItem('isla_notrack');console.log('[isla] tracking re-enabled');}window.__ISLA_NOTRACK=localStorage.getItem('isla_notrack')==='1';}catch(e){window.__ISLA_NOTRACK=false;}})();`,
      },
      {
        children: `if(!window.__ISLA_NOTRACK){(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:6543709,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');}`,
      },
      {
        children: `if(!window.__ISLA_NOTRACK){!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://b2bjsstore.s3.us-west-2.amazonaws.com/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}("5NRP9H78LQO1");}`,
      },
      {
        children: `if(!window.__ISLA_NOTRACK){!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Ne Ds capture Ee calculateEventProperties Ms register register_once register_for_session unregister unregister_for_session js getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ts $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug ks getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_tDJt2fSpBxP2bgCcLNuJtwjqWCLwhm855siiDe7GeLZh',{api_host:'https://us.i.posthog.com',defaults:'2026-01-30'});}`,
      },
      {
        defer: true,
        "data-website-id": "dfid_W29SlG3Vjz2wVAmVJdBpr",
        "data-domain": "isla.to",
        src: "https://datafa.st/js/script.js",
      },
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-V0HBMBP0LG",
      },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V0HBMBP0LG');`,
      },



    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <TrackingBootstrap />
      <ScrollReveal />
      <AnimatedOutlet />
    </>
  );
}
