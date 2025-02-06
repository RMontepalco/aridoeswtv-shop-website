import './ContactPage.css'

import blog from '/blog.png'
import contactMe from '/contact-me.gif'
import questions from '/questions.gif'
import instagram from '/instagram.png'
import koFi from '/ko-fi.png'

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
          <li>
            Q: Lorem ipsum odor amet, consectetuer adipiscing elit.<br/>
            A: Bibendum libero nec inceptos leo ligula semper aenean.
          </li>
          <li>
            Q: Bibendum libero nec inceptos leo ligula semper aenean.<br/>
            A: Rhoncus gravida nullam tempor, conubia fringilla per non.
          </li>
          <li>
            Q: Luctus metus facilisis pellentesque mi metus curabitur ut.<br/>
            A: Sodales ipsum dui, integer tortor ultrices dolor torquent. 
          </li>
          <li>
            Q: Uctus ultricies eu enim nisi arcu massa commodo.<br/>
            A: Nulla duis ex luctus enim ornare lacus.
          </li>
        </ul>
      </div>
    </div>
  )
}
