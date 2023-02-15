import React from 'react';

const HomePage = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center  mt-5 '>
        
                <div className='d-flex justify-content-end w-50' style={{color: 'white'}}>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor neque vel aliquam pretium. Pellentesque maximus augue sed finibus venenatis. Suspendisse ullamcorper hendrerit efficitur. Maecenas mi nisl, consectetur ac fringilla sit amet, dignissim vitae est. Aenean dapibus velit vel nunc tincidunt, quis fringilla dui commodo. Sed ultrices tellus lorem. Praesent quis mauris nunc.In dapibus diam vel dignissim dictum. Nulla facilisi. Integer a quam id lacus porttitor varius</span>
                    <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/reshiram.gif" width={'400px'} height='300px' alt="Reshiram"/>
                </div>

                <div className='d-flex justify-content-start w-50'>
                    <img src="https://img.pokemondb.net/sprites/black-white/anim/back-normal/zekrom.gif" width={'400px'} height='300px' alt="Zekrom"/> 
                </div>
            
        </div>
    );
}
export default HomePage;
