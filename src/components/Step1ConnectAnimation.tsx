import { useEffect, useRef, useState } from "react";

const URL_TEXT = "https://www.linkedin.com/in/eduardo-schuch/";
const LOOP_MS = 9000;

interface Props {
  isActive: boolean;
}

export default function Step1ConnectAnimation({ isActive }: Props) {
  const [typed, setTyped] = useState("");
  const [focused, setFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [badgeState, setBadgeState] = useState<"hidden" | "show" | "hide">("hidden");
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [nameLoaded, setNameLoaded] = useState(false);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState([false, false, false]);
  const [statValues, setStatValues] = useState<[string, string, string]>(["0", "0", "0%"]);
  const [sweepActive, setSweepActive] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafsRef = useRef<number[]>([]);

  const T = (fn: () => void, delay: number) => {
    timeoutsRef.current.push(setTimeout(fn, delay));
  };

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    rafsRef.current.forEach(cancelAnimationFrame);
    rafsRef.current = [];
  };

  const reset = () => {
    clearAll();
    setTyped("");
    setFocused(false);
    setCursorVisible(false);
    setBadgeState("hidden");
    setAvatarLoaded(false);
    setNameLoaded(false);
    setRoleLoaded(false);
    setStatsLoaded([false, false, false]);
    setStatValues(["0", "0", "0%"]);
    setSweepActive(false);
  };

  const typeText = (text: string, perChar: number, startDelay: number, onDone: () => void) => {
    let i = 0;
    T(() => {
      const step = () => {
        if (i <= text.length) {
          setTyped(text.slice(0, i));
          i++;
          if (i <= text.length) {
            const jitter = perChar + (Math.random() * 20 - 10);
            T(step, Math.max(18, jitter));
          } else {
            onDone();
          }
        }
      };
      step();
    }, startDelay);
  };

  const countUp = (
    idx: number,
    target: number,
    duration: number,
    startDelay: number,
    suffix: string,
    isFloat: boolean,
  ) => {
    T(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        const val = eased * target;
        const formatted = isFloat
          ? val.toFixed(1) + suffix
          : Math.floor(val).toLocaleString() + suffix;
        setStatValues((prev) => {
          const next = [...prev] as [string, string, string];
          next[idx] = formatted;
          return next;
        });
        if (p < 1) {
          rafsRef.current.push(requestAnimationFrame(tick));
        } else {
          const final = (isFloat ? target.toFixed(1) : target.toLocaleString()) + suffix;
          setStatValues((prev) => {
            const next = [...prev] as [string, string, string];
            next[idx] = final;
            return next;
          });
        }
      };
      rafsRef.current.push(requestAnimationFrame(tick));
    }, startDelay);
  };

  const runSequence = () => {
    T(() => {
      setFocused(true);
      setCursorVisible(true);
    }, 400);

    typeText(URL_TEXT, 32, 900, () => {
      T(() => {
        setCursorVisible(false);
        setBadgeState("show");
      }, 350);

      T(() => setSweepActive(true), 600);
      T(() => setAvatarLoaded(true), 850);
      T(() => setNameLoaded(true), 1000);
      T(() => setRoleLoaded(true), 1150);

      const statDefs = [
        { target: 2345, suffix: "", isFloat: false, dur: 900 },
        { target: 12, suffix: "", isFloat: false, dur: 700 },
        { target: 3.2, suffix: "%", isFloat: true, dur: 800 },
      ];
      statDefs.forEach((s, idx) => {
        const baseDelay = 1350 + idx * 180;
        T(() => {
          setStatsLoaded((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }, baseDelay);
        countUp(idx, s.target, s.dur, baseDelay + 30, s.suffix, s.isFloat);
      });

      T(() => setBadgeState("hide"), 4500);
    });
  };

  useEffect(() => {
    if (!isActive) {
      reset();
      return;
    }
    const loop = () => {
      reset();
      runSequence();
      T(loop, LOOP_MS);
    };
    loop();
    return () => clearAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="isla-step1-root">
      <style>{css}</style>
      <div className="stage">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="scene">
          <div className="input-label">LinkedIn URL</div>
          <div className={`input-field ${focused ? "focused" : ""}`}>
            <span className="typed">{typed}</span>
            <span className={`cursor ${cursorVisible ? "visible" : ""}`} />
          </div>
          <div className="input-hint">e.g. https://linkedin.com/in/yourname</div>

          <div
            className={`detected-badge ${
              badgeState === "show" ? "show" : badgeState === "hide" ? "hide" : ""
            }`}
          >
            <span className="detected-dot" />
            <span className="detected-text">Profile detected — ready to analyze</span>
          </div>

          <div className="profile-card">
            <div className="window-bar">
              <div className="wc wc-red" />
              <div className="wc wc-yellow" />
              <div className="wc wc-green" />
              <span className="url-label">isla.app</span>
            </div>

            <div className="profile-head">
              <div className={`profile-avatar ${avatarLoaded ? "loaded" : ""}`}>
                {!avatarLoaded && <div className="avatar-shimmer" />}
                <span className="avatar-letter">E</span>
              </div>
              <div className="profile-info">
                <div className="profile-name-row">
                  {!nameLoaded && <div className="skeleton-name" />}
                  {nameLoaded && <div className="profile-name show">Eduardo Schuch</div>}
                </div>
                <div className="profile-role-row">
                  {!roleLoaded && <div className="skeleton-role" />}
                  {roleLoaded && (
                    <div className="profile-role show">Founder of Isla 🏝️ | MIT</div>
                  )}
                </div>
              </div>
            </div>

            <div className="stats">
              {[
                { label: "Connections" },
                { label: "Posts/mo" },
                { label: "Avg Eng" },
              ].map((s, i) => (
                <div className="stat" key={i}>
                  {!statsLoaded[i] ? (
                    <>
                      <div className="stat-skeleton" />
                      <div className="stat-skeleton-label" />
                    </>
                  ) : (
                    <>
                      <div className="stat-value">{statValues[i]}</div>
                      <div className="stat-label">{s.label}</div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className={`scan-sweep ${sweepActive ? "active" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
.isla-step1-root { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
.isla-step1-root .stage { width: 100%; height: 100%; background: linear-gradient(180deg, #E6F4FD 0%, #C8EBFB 100%); position: relative; overflow: hidden; border-radius: inherit; }
.isla-step1-root .stage::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25) 0%, transparent 50%); pointer-events: none; z-index: 1; }
.isla-step1-root .orb { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%); pointer-events: none; animation: islaOrbFloat 8s ease-in-out infinite; z-index: 1; }
.isla-step1-root .orb-1 { width: 100px; height: 100px; top: -30px; right: -30px; }
.isla-step1-root .orb-2 { width: 140px; height: 140px; bottom: -50px; left: -50px; animation-delay: -4s; }
@keyframes islaOrbFloat { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,-10px); } }
.isla-step1-root .scene { position: absolute; inset: 0; z-index: 2; padding: 28px 32px; display: flex; flex-direction: column; }
.isla-step1-root .input-label { font-size: 10px; font-weight: 700; color: #1a2332; letter-spacing: 0.3px; margin-bottom: 8px; }
.isla-step1-root .input-field { background: #fff; border: 1.5px solid rgba(26,35,50,0.08); border-radius: 8px; height: 38px; padding: 0 14px; display: flex; align-items: center; font-size: 11px; color: #1a2332; font-variant-numeric: tabular-nums; position: relative; box-shadow: 0 2px 8px rgba(20,40,70,0.04); transition: border-color .3s ease, box-shadow .3s ease; }
.isla-step1-root .input-field.focused { border-color: #00A8E8; box-shadow: 0 0 0 3px rgba(0,168,232,0.12); }
.isla-step1-root .typed { white-space: pre; color: #1a2332; }
.isla-step1-root .cursor { display: inline-block; width: 1.5px; height: 14px; background: #1a2332; margin-left: 1px; vertical-align: middle; animation: islaCursorBlink .9s step-end infinite; opacity: 0; }
.isla-step1-root .cursor.visible { opacity: 1; }
@keyframes islaCursorBlink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
.isla-step1-root .input-hint { font-size: 9px; color: #7a8799; margin-top: 7px; font-weight: 500; }
.isla-step1-root .detected-badge { margin-top: 12px; align-self: flex-start; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 999px; padding: 6px 12px 6px 10px; display: inline-flex; align-items: center; gap: 7px; opacity: 0; transform: translateY(4px); }
.isla-step1-root .detected-badge.show { animation: islaBadgeIn .5s cubic-bezier(0.34,1.4,0.5,1) forwards; }
.isla-step1-root .detected-badge.hide { animation: islaBadgeOut .4s ease forwards; }
@keyframes islaBadgeIn { 0% { opacity: 0; transform: translateY(4px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes islaBadgeOut { to { opacity: 0; transform: translateY(-3px); } }
.isla-step1-root .detected-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); animation: islaLivePulse 1.6s ease-in-out infinite; }
@keyframes islaLivePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); } }
.isla-step1-root .detected-text { font-size: 9.5px; font-weight: 700; color: #047857; letter-spacing: 0.1px; }
.isla-step1-root .profile-card { background: #fff; border-radius: 12px; padding: 14px; box-shadow: 0 10px 30px rgba(20,40,70,0.10), 0 2px 6px rgba(20,40,70,0.05); margin-top: auto; margin-bottom: 6px; position: relative; opacity: 0; transform: translateY(10px); animation: islaCardIn .6s cubic-bezier(0.34,1.2,0.5,1) .3s forwards; }
@keyframes islaCardIn { to { opacity: 1; transform: translateY(0); } }
.isla-step1-root .window-bar { display: flex; align-items: center; gap: 5px; margin-bottom: 12px; padding: 0 2px; }
.isla-step1-root .wc { width: 8px; height: 8px; border-radius: 50%; }
.isla-step1-root .wc-red { background: #ff5f57; }
.isla-step1-root .wc-yellow { background: #febc2e; }
.isla-step1-root .wc-green { background: #28c840; }
.isla-step1-root .url-label { font-size: 9px; color: #9ba7b8; margin-left: 6px; font-weight: 500; }
.isla-step1-root .profile-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; min-height: 40px; }
.isla-step1-root .profile-avatar { width: 38px; height: 38px; border-radius: 50%; background: #e2e8ef; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; flex-shrink: 0; position: relative; overflow: hidden; transition: background .4s ease; }
.isla-step1-root .profile-avatar.loaded { background: #0A7A9F; }
.isla-step1-root .avatar-letter { opacity: 0; transition: opacity .3s ease .1s; }
.isla-step1-root .profile-avatar.loaded .avatar-letter { opacity: 1; }
.isla-step1-root .avatar-shimmer { position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%); animation: islaShimmer 1.4s ease-in-out infinite; }
@keyframes islaShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
.isla-step1-root .profile-info { flex: 1; min-width: 0; }
.isla-step1-root .profile-name-row { height: 14px; display: flex; align-items: center; margin-bottom: 5px; position: relative; }
.isla-step1-root .skeleton-name { width: 110px; height: 11px; background: #e8eef4; border-radius: 4px; position: relative; overflow: hidden; }
.isla-step1-root .skeleton-name::after, .isla-step1-root .skeleton-role::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%); animation: islaShimmer 1.4s ease-in-out infinite; }
.isla-step1-root .profile-name { font-size: 13px; font-weight: 700; color: #1a2332; letter-spacing: -0.1px; white-space: nowrap; opacity: 0; transition: opacity .3s ease; }
.isla-step1-root .profile-name.show { opacity: 1; }
.isla-step1-root .profile-role-row { height: 11px; display: flex; align-items: center; position: relative; }
.isla-step1-root .skeleton-role { width: 130px; height: 8px; background: #eef2f7; border-radius: 4px; position: relative; overflow: hidden; }
.isla-step1-root .profile-role { font-size: 10px; color: #7a8799; font-weight: 500; white-space: nowrap; opacity: 0; transition: opacity .3s ease; }
.isla-step1-root .profile-role.show { opacity: 1; }
.isla-step1-root .stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.isla-step1-root .stat { background: #f4f7fa; border-radius: 8px; padding: 9px 6px 7px; text-align: center; position: relative; overflow: hidden; }
.isla-step1-root .stat-value { font-size: 15px; font-weight: 700; color: #1a2332; letter-spacing: -0.4px; font-variant-numeric: tabular-nums; line-height: 1.1; min-height: 16px; }
.isla-step1-root .stat-label { font-size: 8.5px; color: #7a8799; font-weight: 500; margin-top: 2px; letter-spacing: 0.1px; }
.isla-step1-root .stat-skeleton { height: 13px; width: 34px; margin: 1px auto 3px; background: #dfe6ee; border-radius: 4px; position: relative; overflow: hidden; }
.isla-step1-root .stat-skeleton::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%); animation: islaShimmer 1.4s ease-in-out infinite; }
.isla-step1-root .stat-skeleton-label { height: 7px; width: 44px; margin: 0 auto; background: #e8eef4; border-radius: 3px; }
.isla-step1-root .scan-sweep { position: absolute; inset: 0; border-radius: 12px; overflow: hidden; pointer-events: none; }
.isla-step1-root .scan-sweep::before { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; background: linear-gradient(90deg, transparent 0%, rgba(0,168,232,0.15) 40%, rgba(0,168,232,0.28) 50%, rgba(0,168,232,0.15) 60%, transparent 100%); left: -60px; opacity: 0; }
.isla-step1-root .scan-sweep.active::before { animation: islaSweep .9s cubic-bezier(0.4,0,0.3,1); }
@keyframes islaSweep { 0% { left: -60px; opacity: 1; } 100% { left: 100%; opacity: 1; } }
`;
