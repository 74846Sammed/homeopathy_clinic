import React from 'react';
import asthmaImg from '../../Assets/Images/asthmaImg.avif';
import backPainImg from '../../Assets/Images/backpainImg.jpg';
import allergyImg from '../../Assets/Images/allergyImg.jpg';
import hailfallImg from '../../Assets/Images/hairlossImg.jpg';
import infertility from '../../Assets/Images/Infertility.jpg';
import gynecology from '../../Assets/Images/Gynecology.jpeg';
import migraine from '../../Assets/Images/Migraine.jpg';
import pcod from '../../Assets/Images/pcod2.jpg';
import '../Services/Services.css';

function Services() {
    return (
        <div className='services-card-container container'>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={asthmaImg}/>
                </div>
                <div className='service-name'>Asthma</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={allergyImg}/>
                </div>
                <div className='service-name'>Allergy</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={backPainImg}/>
                </div>
                <div className='service-name'>Back Pain</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={hailfallImg}/>
                </div>
                <div className='service-name'>Hair Fall</div>
            </div>
            {/* <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={migraine}/>
                </div>
                <div className='service-name'>Migraine</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={gynecology}/>
                </div>
                <div className='service-name'>Gynecology</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={infertility}/>
                </div>
                <div className='service-name'>Infertility</div>
            </div>
            <div className='card col-md-3'>
                <div className='card-img-container'>
                    <img className='service-img' src={pcod}/>
                </div>
                <div className='service-name'>PCOD</div>
            </div> */}
        </div>
    )
}

export default Services
