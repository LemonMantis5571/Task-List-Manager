import React from 'react';
import Checklist from '../assets/images/10492.png'
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
                        <span className='home-description'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero delectus, iure quia odit maxime dolore nisi, temporibus doloribus similique id non commodi beatae tenetur earum aliquid porro distinctio? Dolores, placeat.</span>
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
                    <img src={Checklist} alt="People" width='600px' height='500px'/>
                </div>
            </section>

            <section className='sec-features'>
                <div className='home-cta'>
                    <span className='cta-text'>
                        Lorem
                        <i className="bi bi-arrow-right"></i>
                    </span>
                    <div className='title-description mb-3'>
                        <h2 className='home-title display-2'>Lorem</h2>
                        <span className='home-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero delectus, iure quia odit maxime dolore nisi, temporibus doloribus similique id non commodi beatae tenetur earum aliquid porro distinctio? Dolores, placeat.</span>
                    </div>
                    <div className="lead-magnet row align-items-center">
                        <div className="col">
                            <input type="text" className="form-control input-text" placeholder="Email address"/>
                        </div>
                        <div className="col input-col">
                            <button className="btn-main">Lorem</button>
                        </div>
                    </div>
                </div>
                {/* <div className="home-img d-none d-md-block">
                    <img src={Checklist} alt="People" width='600px' height='500px'/>
                </div> */}
            </section>
            
            <section className='sec-keys'>
                <div className='home-cta'>
                    <span className='cta-text'>
                        Lorem
                        <i className="bi bi-arrow-right"></i>
                    </span>
                    <div className='title-description mb-3'>
                        <h2 className='home-title display-2'>Lorem</h2>
                        <span className='home-description'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero delectus, iure quia odit maxime dolore nisi, temporibus doloribus similique id non commodi beatae tenetur earum aliquid porro distinctio? Dolores, placeat.</span>
                    </div>
                    <div className="lead-magnet row align-items-center">
                        <div className="col">
                            <input type="text" className="form-control input-text" placeholder="Email address"/>
                        </div>
                        <div className="col input-col">
                            <button className="btn-main">Lorem</button>
                        </div>
                    </div>
                </div>
                {/* <div className="home-img d-none d-md-block">
                    <img src={Checklist} alt="People" width='600px' height='500px'/>
                </div> */}
            </section>

        </div>
    );
}
export default HomePage;
