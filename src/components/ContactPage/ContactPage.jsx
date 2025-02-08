import './ContactPage.css'

import blog from '/images/blog.png'
import contactMe from '/gifs/contact-me.gif'
import questions from '/gifs/questions.gif'
import instagram from '/images/instagram.png'
import koFi from '/images/ko-fi.png'

export default function ContactPage() {
  return (
    <div className="contact">
      <img className="contact-header" src={contactMe} alt="Contact me!"/>
      <div className="contact-links">
        <a href="https://www.instagram.com/aridoeswtv">
          <img src={instagram} alt="Instagram"/>
          <h2>instagram</h2>
        </a>
        <a href="https://ko-fi.com/aridoeswtv">
          <img src={koFi} alt="Ko-fi"/>
          <h2>ko-fi</h2>
        </a>
        <a href="https://aridoeswtv.blogspot.com">
          <img src={blog} alt="Blogspot"/>
          <h2>my blog!</h2>
        </a>
      </div>
      <div className="contact-questions">
        <img className="contact-header" src={questions} alt="Frequently asked questions"/>
        <ul>
          <li className="contact-question">
            Do you ship internationally?
          </li>
          <li className="contact-answer">
            Yes! Please message me on instagram for international orders! Do take note,
            shipping for international orders will depend on where you’re from, but don’t
            hesitate to message me for more info!
          </li>
          <li className="contact-question">
            How long do you take to mail orders out?
          </li>
          <li className="contact-answer">
            I do mail runs on Fridays!
          </li>
          <li className="contact-question">
            Shipping is too pricey, can I do pick up?
          </li>
          <li className="contact-answer">
            Of course! With the recent surge in mailing price, I now offer pick up for orders.
            Do take note that I only do pickups at Lakeside or Boon Lay MRT on Saturdays!
          </li>
          <li className="contact-question">
            There is something wrong with my order/ I have problems checking out
          </li>
          <li className="contact-answer">
            DM me on instagram and I will help you!
          </li>
        </ul>
      </div>
    </div>
  )
}
