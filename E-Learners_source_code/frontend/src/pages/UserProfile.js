import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const UserProfile = () =>{
    return (
        <>
        <div className="container emp-profile">
            <form action="" method="">
                <div className="row">
                    <div className="col-md-4">
                        <img src={require("../assets/Home/profilephoto.jpg")} alt='no internet connection' width="400"/>

                    </div>
                    <div className="col-md-6 mt-5">
                        <div className="profile-head">
                            <h5>Saiful Islam</h5>
                            <h6>Web Developer</h6>
                            <p className="profile-rating mt-3 mb-5">RANKINGS
                                <span>
                                    1/10
                                </span>
                            </p>
                            {/* <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="profile-tab"
                            className="mb-3"
                            >
                                <Tab eventKey="home" title="Home">
                                    
                                </Tab>
                                <Tab eventKey="home" title="Profile" className="ml-10">
                                    
                                </Tab>

                            </Tabs> */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                                </li> */}


                            </ul>
                        </div>

                    </div>
                    <div className="col-md-2 mt-5">
                        <input type="submit"className="profile-edit-btn" value="Edit Profile" name="btnAddMore" ></input>

                    </div>

                </div>
                <div className="row">
                    {/* info */}
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p> 
                                Social Media
                            </p>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Youtube</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Instagram</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">FaceBook</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Twitter</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">LinkedIN</a>

                        </div>


                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="mytabcontent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>"User ID"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"2342342353454624"</p>
                                    </div>

                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"User Name"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"Saiful Islam"</p>
                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"Email address"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"saif@gmail.com"</p>
                                    </div>

                                </div>

                            </div>
                            {/* <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="row">
                                    <div className="col-md-6">
                                        <label>"User ID\\"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"2342342353454624"</p>
                                    </div>

                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"User Name"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"Saiful Islam"</p>
                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"Email address"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"saif@gmail.com"</p>
                                    </div>

                                </div>
                            </div> */}

                        </div>

                    </div>

                </div>

            </form>
        </div>
        </>
    )
}
export default UserProfile;