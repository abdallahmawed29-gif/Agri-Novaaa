import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const crops = [
  ['🍅','الطماطم','خضروات','متوسط','طميية جيدة الصرف','حساسة نسبيًا'],
  ['🥒','الخيار','خضروات','مرتفع','خفيفة جيدة الصرف','حساسة'],
  ['🌶️','الفلفل','خضروات','متوسط','خصبة جيدة الصرف','متوسطة'],
  ['🥔','البطاطس','خضروات','متوسط','رملية طميية','متوسطة'],
  ['🍓','الفراولة','فاكهة','متوسط','خفيفة جيدة الصرف','حساسة'],
  ['🍇','العنب','فاكهة','متوسط','طميية جيدة الصرف','متوسطة'],
  ['🍊','الموالح','فاكهة','متوسط','طميية عميقة','متوسطة'],
  ['🥭','المانجو','فاكهة','متوسط','عميقة جيدة الصرف','حساسة نسبيًا'],
  ['🌾','القمح','حبوب','متوسط','طميية خصبة','متوسطة التحمل'],
  ['🌽','الذرة','حبوب','مرتفع نسبيًا','خصبة جيدة الصرف','متوسطة'],
  ['🌾','الأرز','حبوب','مرتفع','طينية طميية','متوسطة'],
  ['☘️','البرسيم','محاصيل حقلية','مرتفع','خصبة','متوسطة'],
  ['🫘','الفول','محاصيل حقلية','متوسط','طميية','متوسطة'],
  ['🌱','بنجر السكر','محاصيل حقلية','متوسط','طميية جيدة الصرف','يتحمل نسبيًا']
].map(([icon,name,category,water,soil,salt],i)=>({id:i,icon,name,category,water,soil,salt}))

const cats=['الكل','خضروات','فاكهة','حبوب','محاصيل حقلية']

function App(){
  const [tab,setTab]=useState('home')
  const [cat,setCat]=useState('الكل')
  const [crop,setCrop]=useState(crops[0])
  const [q,setQ]=useState('')
  const [answer,setAnswer]=useState('')
  const shown=cat==='الكل'?crops:crops.filter(x=>x.category===cat)

  return <div>
    <header>
      <div className="brand"><span>🌱</span><div><b>زرع AI</b><small>المساعد الزراعي الذكي</small></div></div>
      <nav>
        <button onClick={()=>setTab('home')}>الرئيسية</button>
        <button onClick={()=>setTab('photo')}>تشخيص بالصور</button>
        <button onClick={()=>setTab('ask')}>اسأل المهندس AI</button>
      </nav>
    </header>

    {tab==='home' && <>
      <section className="hero">
        <div>
          <em>🌿 زراعة أذكى لمحصول أفضل</em>
          <h1>خلي <strong>زرعك</strong><br/>دايمًا في أمان</h1>
          <p>منصة عربية بسيطة تساعدك تعرف احتياجات محصولك وتحصل على إرشادات زراعية أولية.</p>
          <button className="cta" onClick={()=>document.querySelector('#crops').scrollIntoView({behavior:'smooth'})}>اختار محصولك</button>
        </div>
        <div className="plant">🌱</div>
      </section>

      <main id="crops">
        <h2>اختار المحصول</h2>
        <p className="muted">اعرف المياه والتربة وتحمل الملوحة لكل محصول.</p>
        <div className="cats">{cats.map(x=><button className={cat===x?'on':''} onClick={()=>setCat(x)} key={x}>{x}</button>)}</div>
        <div className="grid">{shown.map(x=><button className={crop.id===x.id?'card selected':'card'} onClick={()=>setCrop(x)} key={x.id}><span>{x.icon}</span><b>{x.name}</b><small>{x.category}</small></button>)}</div>

        <section className="details">
          <h2>{crop.icon} {crop.name}</h2>
          <div className="facts">
            <article><span>💧</span><b>المياه</b><p>{crop.water}</p></article>
            <article><span>🌍</span><b>التربة</b><p>{crop.soil}</p></article>
            <article><span>🧂</span><b>الملوحة</b><p>{crop.salt}</p></article>
            <article><span>💡</span><b>نصيحة</b><p>انتظم في الري وراقب الأوراق والتربة باستمرار.</p></article>
          </div>
        </section>
      </main>
    </>}

    {tab==='photo' && <main className="panel">
      <div className="big">📷</div><h1>تشخيص بالصور</h1>
      <p className="muted">ارفع صورة واضحة للنبات أو الجزء المصاب.</p>
      <label className="upload"><input type="file" accept="image/*"/><span>📸</span><b>اختار صورة</b><small>JPG أو PNG</small></label>
      <p className="notice">هذه النسخة تعرض واجهة التشخيص. ربط نموذج ذكاء اصطناعي فعلي يحتاج API في مرحلة لاحقة.</p>
    </main>}

    {tab==='ask' && <main className="panel">
      <div className="big">🤖</div><h1>اسأل المهندس AI</h1>
      <textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="مثال: أوراق الطماطم بتصفر، أعمل إيه؟"/>
      <button className="cta full" onClick={()=>setAnswer(q.trim()?'ابدأ بفحص انتظام الري والصرف، ثم افحص الأوراق بحثًا عن آفات أو بقع. للحصول على تشخيص دقيق يلزم معرفة الأعراض وصورة واضحة للنبات.':'اكتب سؤالك الأول.')}>إرسال السؤال</button>
      {answer&&<div className="reply">{answer}</div>}
    </main>}

    <footer>© 2026 زرع AI — المساعد الزراعي الذكي</footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>)
