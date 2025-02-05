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
          <p>instagram</p>
        </a>
        <a href="https://ko-fi.com/aridoeswtv">
          <img src={koFi} alt="Ko-fi"/>
          <p>ko-fi</p>
        </a>
        <a href="https://aridoeswtv.blogspot.com">
          <img src={blog} alt="Blogspot"/>
          <p>my blog!</p>
        </a>
      </div>
      <div className="questions">
        <img className="contact-header" src={questions} alt="Frequently asked questions"/>

        {
          // TO DO: Connect FAQ to database
        }
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit.
          Bibendum libero nec inceptos leo ligula semper aenean.
          Rhoncus gravida nullam tempor, conubia fringilla per non.
          Luctus metus facilisis pellentesque mi metus curabitur ut.
          Sodales ipsum dui, integer tortor ultrices dolor torquent. 
          uctus ultricies eu enim nisi arcu massa commodo.
          Nulla duis ex luctus enim ornare lacus.
          Mus curabitur duis urna habitant aenean tempor a mi.
        </p>
        
      </div>
    </div>
  )
}
