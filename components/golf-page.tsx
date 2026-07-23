import Image from "next/image"
import Link from "next/link"

const reasons = [
  ["FOR GOLFERS", "A simple way to prepare for the moments when calm, clarity and composure matter."],
  ["FOR COACHES", "Supports a golfer’s readiness to receive, process and apply feedback."],
  ["FOR GOLF BUSINESSES", "Adds a differentiated golfer experience designed to strengthen engagement and loyalty."],
]
const steps = [
  ["01", "CHOOSE", "Select Calm, Focus or Energy based on the moment ahead.", "/golf/icons/step-choose.svg"],
  ["02", "MIX", "Mix one stick with 250–300 mL of water.", "/golf/icons/step-mix.svg"],
  ["03", "TIME IT", "Drink approximately 30 minutes before your lesson, practice session or tee time.", "/golf/icons/step-time.svg"],
]
const science = [
  ["PharmaGABA® Foundation", "Calm Starts Here", "Naturally fermented PharmaGABA® is the clinically studied form of GABA at the center of every AVRO formula.", "/golf/icons/pharmagaba.svg"],
  ["AVRO Calm", "Composure When It Matters", "PharmaGABA® plus magnesium for golfers who want a calmer, more composed way to prepare for pressure-sensitive moments.", "/golf/icons/calm-foundation.svg"],
  ["AVRO Focus", "Clearer Attention for Learning", "PharmaGABA® plus Cognigrape® for lessons, fittings and practice sessions that call for calm, attentive focus.", "/golf/icons/clarity.svg"],
  ["AVRO Energy", "Steady Energy for Demanding Golf Days", "PharmaGABA® plus natural caffeine for early tee times, longer rounds and competition days that require more energy.", "/golf/icons/mind-body.svg"],
]
const moments = [
  ["FIRST TEE", "A simple pre-round ritual before the opening shot.", "/golf/first-tee.png"],
  ["TOURNAMENT DAY", "Preparation for pressure-sensitive rounds when composure matters from the start.", "/golf/tournament-day.png"],
  ["PRACTICE SESSION", "For range work, coaching sessions and structured practice.", "/golf/practice-session.jpeg"],
  ["CLUBHOUSE + SOCIAL", "An alcohol-free option for post-round conversations, travel days and social golf moments.", "/golf/clubhouse-social.png"],
]
const products = [
  ["AVRO CALM", "CAFFEINE FREE", "Calm support for pressure-sensitive golf moments.", "First tees, tournament rounds, lessons and moments when composure matters.", "Shop Calm", "/golf/product-calm.png", "/products/calm"],
  ["AVRO FOCUS", "CAFFEINE FREE", "Calm-first preparation with added support for clear, attentive focus.", "Coaching sessions, club fitting, range work and structured practice.", "Shop Focus", "/golf/product-focus.png", "/products/focus"],
  ["AVRO ENERGY", "WITH NATURAL CAFFEINE", "Calm-first preparation with natural caffeine for demanding golf days.", "Early tee times, longer rounds, travel days and competition.", "Shop Energy", "/golf/product-energy.png", "/products/energy"],
]
const faqs = [
  ["Which AVRO formula is best for golf?", "Choose based on the moment ahead. Calm is caffeine-free and designed for composure. Focus is caffeine-free and adds support for clear, attentive focus. Energy combines AVRO’s calm-first foundation with natural caffeine for longer or more demanding golf days."],
  ["When should I take AVRO before a round?", "Mix one stick with 250–300 mL of water and drink it approximately 30 minutes before a lesson, practice session, tee time or competition. Follow the directions on the package."],
  ["What role does AVRO play in golf performance?", "AVRO supports the calm, clear and composed headspace golfers seek. It complements coaching, practice, fitting and technology—it does not replace them or claim to improve the swing or score."],
]

export function GolfPage() {
  return <main className="golf-page">
    <section className="golf-hero golf-tile">
      <Image src="/golf/hero-coastal.png" alt="Golfer seated on a coastal course beside AVRO drink mix" fill priority sizes="100vw" className="golf-cover" />
      <div className="golf-hero-shade" />
      <div className="golf-hero-copy">
        <p className="golf-kicker">CALM PERFORMANCE FOR GOLF</p>
        <h1>Golf Performance Begins Before the First Swing.</h1>
        <p>AVRO supports the calm, clear and composed headspace golfers seek before lessons, practice and competition—so they can step into the moment ready.</p>
        <div className="golf-actions"><Link href="#shop" className="golf-btn golf-btn-light">Choose Your Formula</Link><Link href="/shop" className="golf-btn golf-btn-ghost">Shop AVRO</Link></div>
      </div>
      <div className="golf-ritual"><p>THE PRE-GOLF MINDSET</p>{[["01", "PREPARE", "Before lessons, practice or play."],["02", "CHOOSE", "Calm, Focus or Energy."],["03", "STEP IN READY", "Calm. Clear. Composed."]].map(x=><div key={x[0]}><b>{x[0]} — {x[1]}</b><span>{x[2]}</span></div>)}</div>
    </section>

    <section className="golf-pressure golf-tile">
      <div className="golf-copy"><p className="golf-kicker">WHEN THE MOMENT GETS BIGGER</p><h2>Golf can get loud in your head fast.</h2><p>The first tee. A difficult approach. A lesson where every detail matters. When pressure rises, golfers need more than physical preparation—they need a better way to step into the moment.</p><div className="golf-callout"><Image src="/golf/icons/pressure.svg" alt="" width={52} height={52}/><span>Approximately 30 minutes before golf.</span></div></div>
      <div className="golf-pressure-image"><Image src="/golf/golfer-address.png" alt="Golfer preparing to address the ball on a coastal course" fill sizes="(max-width: 768px) 100vw, 50vw" className="golf-cover" /></div>
    </section>

    <section className="golf-section golf-tile"><div className="golf-heading"><p className="golf-kicker">CALM-FIRST PERFORMANCE</p><h2>Why AVRO Matters in Golf</h2><p>A calm-first platform with a clear role across the modern golf experience.</p></div><div className="golf-three">{reasons.map((x,i)=><article className="golf-reason" key={x[0]}><span>0{i+1}</span><Image src={["/golf/icons/built-for-ritual.svg","/golf/icons/clarity.svg","/golf/icons/standards.svg"][i]} alt="" width={64} height={64}/><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

    <section className="golf-section golf-dark golf-tile"><div className="golf-heading"><p className="golf-kicker">HOW TO USE AVRO BEFORE GOLF</p><h2>A simple ritual. Three steps.</h2><p>Choose. Mix. Time it.</p></div><div className="golf-three">{steps.map(x=><article className="golf-step" key={x[0]}><div><strong>{x[0]}</strong><Image src={x[3]} alt="" width={70} height={70}/></div><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

    <section className="golf-section golf-tile"><div className="golf-heading"><p className="golf-kicker">THE FORMULA</p><h2>Science + Formula Logic</h2><p>Calm first. Then support the moment.</p></div><div className="golf-science">{science.map(x=><article key={x[0]}><Image src={x[3]} alt="" width={60} height={60}/><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div><p className="golf-foundation">Every AVRO formula begins with naturally fermented PharmaGABA®, a clinically studied form of GABA.</p></section>

    <section className="golf-section golf-tile"><div className="golf-heading"><p className="golf-kicker">FROM FIRST TEE TO CLUBHOUSE</p><h2>Golf Use Moments</h2><p>One calm-first foundation, ready for the moments that shape the golf experience.</p></div><div className="golf-moments">{moments.map(x=><article key={x[0]}><div><Image src={x[2]} alt={`${x[0].toLowerCase()} golf moment`} fill sizes="(max-width: 768px) 100vw, 25vw" className="golf-cover"/></div><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

    <section id="shop" className="golf-section golf-dark golf-tile"><div className="golf-heading"><p className="golf-kicker">CHOOSE YOUR FORMULA</p><h2>Shop AVRO for Golf</h2><p>Same calm-first base. Three ways to meet the moment.</p></div><div className="golf-products">{products.map(x=><article key={x[0]}><div className="golf-product-image"><Image src={x[5]} alt={`${x[0]} drink mix`} fill sizes="(max-width: 768px) 100vw, 33vw" className="golf-contain"/></div><small>{x[1]}</small><h3>{x[0]}</h3><p>{x[2]}</p><p><b>BEST FOR:</b> {x[3]}</p><Link href={x[6]} className="golf-btn golf-btn-light">{x[4]}</Link></article>)}</div></section>

    <section className="golf-faq golf-tile"><div><p className="golf-kicker">GOLF FAQ</p><h2>Questions Before the First Tee.</h2><p>Straight answers about choosing and using AVRO for golf.</p></div><div>{faqs.map((x,i)=><details key={x[0]} open={i===0}><summary>{x[0]}<span>+</span></summary><p>{x[1]}</p></details>)}</div></section>

    <section className="golf-final golf-tile"><div><p className="golf-kicker">CALM FIRST. PLAY YOUR GAME.</p><h2>Choose the formula that fits your golf.</h2><p>Start with calm. Choose Calm, Focus or Energy for the moment ahead.</p><div className="golf-actions"><Link href="/products/calm" className="golf-btn golf-btn-light">Shop Calm</Link><Link href="/products/focus" className="golf-btn golf-btn-ghost">Shop Focus</Link><Link href="/products/energy" className="golf-btn golf-btn-ghost">Shop Energy</Link></div></div></section>
  </main>
}
