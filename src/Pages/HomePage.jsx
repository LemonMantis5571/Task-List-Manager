import React from 'react';
import Checklist from '../assets/images/10492.png';
import Todos from '../assets/images/todos.png';
const HomePage = () => {
    return (
        <div className='HomePage'>
            <section className='sec-home'>
                <div className='home-cta'>
                    <span className='cta-text'>
                        Start Managing your tasks today!
                        <i className="bi bi-arrow-right"></i>
                    </span>
                    <div className='title-description mb-3'>
                        <h2 className='home-title display-2'>Task management and list Tool</h2>
                        <span className='home-description'>  Introducing a cutting-edge task management software tool that will revolutionize the way you approach your to-do list. Say goodbye to the headache of manual organization and prioritization, and hello to a seamless, user-friendly interface that effortlessly streamlines your workflow. With advanced features and customizable options, this software ensures that you stay on top of your tasks, meet your deadlines, and achieve your goals with ease.</span>
                    </div>
                    <div className="lead-magnet row align-items-center">
                        <div className="col">
                            <input type="text" className="form-control input-text" placeholder="Email address"/>
                        </div>
                        <div className="col input-col">
                            <button className="btn-main">Get started</button>
                        </div>
                    </div>
                </div>
                <div className="home-img d-none d-md-block">
                    <img src={Checklist} className='img-fluid' alt="People" width='600px' height='500px'/>
                </div>
            </section>

            <section className='sec-features'>
                <div className='home-cta d-flex flex-column justify-content-center gap-3'>
                    <div className='title-description mb-3 d-flex justify-content-center text-center'>
                        <h2 className='home-title display-2'>Key benefits of using task management software</h2>
                    </div>
                    <div className='items-features d-flex justify-content-around w-100'>
                        <div className='item d-flex flex-column justify-content-center align-items-center text-center'>
                            <i className="bi bi-calendar-check-fill"></i>
                            <h6>Keep Tasks in one place</h6>
                            <span>Save Time, avoid losing work and information, delegate, and track tasks to stay on schedule</span>
                        </div>

                        <div className='item d-flex flex-column justify-content-center align-items-center text-center'>
                            <i className="bi bi-bar-chart-line-fill"></i>
                            <h6>Prioritize your work</h6>
                            <span>Tracking tasks allows everyone to understand which are more important or require more time.</span>
                        </div>

                        <div className='item d-flex flex-column justify-content-center align-items-center text-center'>
                            <i className="bi bi-person-fill-up"></i>
                            <h6>Improve Collaboration</h6>
                            <span>Having and organizable manager improves many aspects of work flow for you and your team.</span>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className='sec-keys'>
                <div className='home-cta d-flex justify-content-center align-items-center'>
                    <div className='title-description d-flex flex-column gap-3'>
                        <h2 className='home-title display-2'>Why do you need a task management software?</h2>
                        <span className='home-description'>Are you spending precious hours sifting through a sea of sticky notes, scouring your inbox and apps for crucial tasks, and grappling with the challenge of prioritization? Allow me to introduce you to a comprehensive solution that can effectively streamline your workflow, optimize your time management, and ensure you meet your deadlines with ease.</span>
                        <span className='cta-text'>
                            Try it out!
                            <i className="bi bi-arrow-right"></i>
                        </span>
                    </div>
                    <div className="home-img d-none d-md-block">
                        <img src={Todos} alt="People" width='600px' height='500px'/>
                    </div>
                </div>
            </section>

        </div>
    );
}
export default HomePage;
