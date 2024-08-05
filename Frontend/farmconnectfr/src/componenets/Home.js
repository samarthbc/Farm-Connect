import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div>
        <div id="carouselExampleRide" className="carousel slide carousel-fade" data-bs-ride="true">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={require("../static/carousel/2_resized.jpeg")} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../static/carousel/3_resized.jpeg")} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../static/carousel/1_resized.jpeg")} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className='container-fluid d-flex justify-content-center my-4 flex-column align-items-center'>
          <img className="mt-5" id='imgswastha' src={require("../static/logos/logo_cropped_resized.png")} alt="" />
          <span className='mt-2 nb-mainline'>FARM-CONNECT</span>
        </div>
      </div>

      {/* Below carousal */}
      <div className="text-center pt-3" id='Mission'>
        <h3 className='nb-fheading'>Farm Connect: The Future of Farming transactions</h3>
        <p className='mt-3 container nb-fpara'>Here, at farmconnect, a common interface connecting suppliers, farmers and wholesale/reatail buyers is established for smooth and fast transactions to modernise agricultural technology.</p>

        <div class="custom-shape-divider-bottom-1718445571">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>

      <div className="text-center py-4" id='home-main'>
        <div class="d-flex justify-content-between container">
          <div class="card ms-5 me-5">
            <div class="card-body">
              <p class="card-text">Supplier</p>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, dolor iste. Quidem sapiente itaque aperiam similique quos saepe exercitationem reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consectetur earum accusamus aspernatur qui illum suscipit voluptate reprehenderit repellat debitis.</p>
            </div>
          </div>
          <div class="card ms-5 me-5">
            <div class="card-body">
            <p class="card-text">Farmer</p>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, dolor iste. Quidem sapiente itaque aperiam similique quos saepe exercitationem reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consectetur earum accusamus aspernatur qui illum suscipit voluptate reprehenderit repellat debitis.</p>
            </div>
          </div>
          <div class="card ms-5 me-5">
            <div class="card-body">
            <p class="card-text">Wholesale/ Retail Buyer</p>
              <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum omnis tempore quam eius assumenda natus? Eum quam ratione laborum qui. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam vel autem tenetur maxime nisi, veniam mollitia deserunt suscipit ut reiciendis.</p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justifycontent-center container mt-4">
          <div class="card mb-3 mx-3" style={{ maxWidth: "540px" }}>
            <div class="card-body">
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem possimus rerum cupiditate perferendis impedit. Quia velit ducimus nam officia necessitatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, fugiat.</p>
            </div>
          </div>

          <div class="card mb-3 mx-3" style={{ maxWidth: "540px" }}>
            <div class="card-body">
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis perferendis beatae nostrum quam, sapiente harum ex! Eos magni vitae nam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, odio?</p>
            </div>
          </div>
        </div>
      </div>


      <div class="custom-shape-divider-top-1718446513">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>

      <div className="text-center container" id="reviews">
        <h3 className="nb-fheading text-center py-4">Reviews</h3>
        <div class="d-flex justify-content-between">
          <div class="card ms-5 me-5">
            <img src={require('../static/review/anilkaur.jfif')} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Anil Kaur</h5>
              <p class="card-text">Farmer</p>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit fugit nostrum itaque eligendi voluptatem obcaecati inventore doloribus molestiae, saepe facilis!</p>
              <p class="card-text"><small class="text-body-secondary">30 minutes ago</small></p>
            </div>
          </div>
          <div class="card ms-5 me-5">
            <img src={require('../static/review/preetikapoor.jfif')} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Preeti Kapoor</h5>
              <p class="card-text">Buyer</p>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, dolor iste. Quidem sapiente itaque aperiam similique quos saepe exercitationem reprehenderit.</p>
              <p class="card-text"><small class="text-body-secondary">11 hours ago</small></p>
            </div>
          </div>
          <div class="card ms-5 me-5">
            <img src={require('../static/review/arjundesai.jfif')} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Arjun Desai</h5>
              <p class="card-text">Farmer</p>
              <p class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum omnis tempore quam eius assumenda natus? Eum quam ratione laborum qui.</p>
              <p class="card-text"><small class="text-body-secondary">11 hours ago</small></p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-warning d-flex justify-content-around align-items-center mt-5">
        <div>
          <p className='my-3' style={{ fontWeight: "bold" }}>Copyright © 2024 FARM-CONNECT PVT-LTD ALL RIGHTS RESERVED</p>
          <p className='text-center' style={{ cursor: 'pointer' }}>
            <Link to='/tac' className='nav-link'>Terms and Conditions</Link>
          </p>
        </div>
        <div className="d-flex flex-column p-3">
          <div style={{ fontWeight: "bold" }}>Project By:</div>
          <div style={{ fontWeight: "bold" }}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Abhimanyu <span style={{ fontWeight: "initial" }}>(1DS23CY003)</span></div>
          <div style={{ fontWeight: "bold" }}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Lakshya Sharma <span style={{ fontWeight: "initial" }}>(1DS23CY030)</span></div>
          <div style={{ fontWeight: "bold" }}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Nikita K <span style={{ fontWeight: "initial" }}>(1DS23CY038)</span></div>
          <div style={{ fontWeight: "bold" }}>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Samarth BC  <span style={{ fontWeight: "initial" }}>(1DS23CY048)</span></div>
        </div>
      </div>
    </>
  )
}

export default Home