import blog from '/blog.png'
import contactMe from '/contact-me.gif'
import girlSit from '/girl-sit.png'
import questions from '/questions.gif'
import instagram from '/instagram.png'
import koFi from '/ko-fi.png'

import './ContactPage.css'

export default function ContactPage() {
  return (
    <div className="contact">
      <img className="girl-sit" src={girlSit} alt="girl-sit"/>
        <img className="contact-header" src={contactMe} alt="contact-me"/>
      <div className="contact-links">
        <a href="https://www.instagram.com/aridoeswtv">
          <img src={instagram} alt="instagram"/>
          <p>instagram</p>
        </a>
        {/*
          TO DO: Add Ko-fi Link
        */}
        <a href="">
          <img src={koFi} alt="ko-fi"/>
          <p>ko-fi</p>
        </a>
        <a href="https://aridoeswtv.blogspot.com">
          <img src={blog} alt="blog"/>
          <p>my blog!</p>
        </a>
      </div>
      <div className="questions">
        <img className="contact-header" src={questions} alt="cquestions"/>
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
