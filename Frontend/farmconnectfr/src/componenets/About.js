import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <h1 className='text-center mt-3 text-success nb-about-heading'>Farm Connect</h1>
      <h1 className='text-center text-success nb-about-heading'>Where Agriculture meets Innovation</h1>

      <div className="d-flex flex-column align-items-center container">

        <p className="nb-about-content text-center text-danger mt-5">
          "At Farm Connect, we're not just building a platform; we're cultivating a community—a
          community where farmers are celebrated as the backbone of our society and buyers and
          sellers are valued partners in a flourishing ecosystem."
        </p>

        <div className="row mt-3">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card border-success text-bg-warning nb-card-text border-2">
              <div className="card-body">
                <p className="card-text">
                  Our journey began with a simple yet profound vision: to empower farmers by providing them
                  with a direct pathway to connect with buyers and sellers, eliminating the barriers that often
                  hinder their success. Through innovation and ingenuity, we've transformed this vision into
                  reality.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card border-success text-bg-warning nb-card-text border-2">
              <div className="card-body">
                <p className="card-text">
                  Imagine a virtual marketplace bustling with activity, where farmers proudly showcase their
                  harvests, and buyers and sellers engage in seamless transactions. With Farm Connect, this
                  vision becomes your reality—a reality where every click brings you closer to quality produce
                  and lucrative opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card border-success text-bg-warning nb-card-text border-2">
              <div className="card-body">
                <p className="card-text">
                  Join us on this journey of growth and prosperity. Whether you're a seasoned farmer with
                  decades of experience or a budding entrepreneur eager to explore the world of agriculture,
                  Farm Connect welcomes you with open arms. {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card border-success text-bg-warning nb-card-text border-2">
              <div className="card-body">
                <p className="card-text">
                  Together, let's sow the seeds of innovation, cultivate lasting connections, and harvest a
                  future where agriculture thrives like never before. Welcome to Farm Connect—where
                  tradition meets transformation, and every connection is a step towards a brighter tomorrow
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="nb-about-content text-center text-danger mt-2" style={{ fontSize: "1.6rem" }}>
          Join Farm Connect today and experience the future of agricultural trade. Together, let's
          cultivate success.
        </p>

      </div>

      <div className="custom-shape-divider-bottom-1707060334">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="text-center pt-3" id="Achievements">
        <h3 className="nb-fheading">Our Achievements</h3>
        <div className="d-flex justify-content-around flex-nowrap align-items-center" style={{ maxWidth: "90vw", margin: "0 auto", flexWrap: "wrap" }}>
          <img src={require("../static/about/guiness_world_record1.jpg")} alt="" className="img-fluid py-2" style={{ width: "300px", height: "auto", marginLeft: "100px" }} />
          <p className="container text-center py-2 nb-achievement-text" style={{ fontSize: "20px", marginBottom: "0", paddingLeft: "50px" }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus rerum non quae perferendis. Quisquam, placeat recusandae. Fuga laboriosam perferendis illo quod quis. Nam architecto odit harum, inventore repellat totam laborum blanditiis, voluptate, optio consequuntur nobis minima aspernatur officiis. Pariatur quis nihil tenetur ipsum nesciunt distinctio numquam consectetur delectus corrupti voluptas? </p>
        </div>
      </div>

      <div className="custom-shape-divider-top-1718434611">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="mb-5" id='oursocials'>
        <h3 className="nb-fheading text-center py-4">Our Socials</h3>
        <div className="container d-flex justify-content-around mt-3 pb-3">
          <i className="fa-brands fa-instagram nb-social-icon" style={{ fontSize: "5vw" }}></i>
          <i className="fa-solid fa-envelope nb-social-icon" style={{ fontSize: "5vw" }}></i>
          <i className="fa-brands fa-x-twitter nb-social-icon" style={{ fontSize: "5vw" }}></i>
          <i className="fa-brands fa-facebook nb-social-icon" style={{ fontSize: "5vw" }}></i>
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

export default About