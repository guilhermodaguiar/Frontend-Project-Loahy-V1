import './AboutUsPage.css'
import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";

function AboutUsPage() {
    const [brandData, setBrandData] = useState({});

    useEffect(() => {
        async function fetchBrandStory() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8080/company`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBrandData(response.data)
            } catch (e) {
                console.error(e);
            }
        }

        fetchBrandStory();
    }, [])

    return (
        <div className="page-title-wrapper">
            {Object.keys(brandData).length > 0 &&
                <><h1 className="title-about-us">{brandData.title}</h1>
                    <article className={"foto-about-us"}>{brandData.image}</article>
                    <article className="story-about-us">{brandData.content}</article>
                </>
            }
        </div>)
}

export default AboutUsPage;