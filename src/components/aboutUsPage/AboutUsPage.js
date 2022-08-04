import './AboutUsPage.css'
import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import Video from "../video/Video";

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
        <>
            <main>
                <div className="outer-container">
                    <div>
                        <h1 className="title-about-us">Over Ons</h1>
                    </div>
                    <div className="inner-container-about-us">
                        <article>
                            <p>
                                Loahy staat voor duurzaam en creatieve producten voor kinderen van alle leeftijden. Speelgoed om kinderen te stimuleren hun fantasie te gebruiken en hun vaardigheden te ontwikkelen.

                                Na de geboorte van zijn zoon Felipe in 2017, besloot oprichter Guilhermo om op zoek te gaan naar de leukste kinderproducten die er zijn. Zo ontstond Loahy. De producten zijn met zorg geselecteerd en worden internationaal ingekocht. Mis je nog iets op de website? Laat het ons weten!
                            </p>
                        </article>
                        <div className="video-spaceship" >
                            <Video/>
                        </div>
                    </div>
                </div>



                <div className="page-title-wrapper" id="our-story">
                    {Object.keys(brandData).length > 0 &&
                        <><h1 className="title-about-us">{brandData.title}</h1>
                            <article className={"foto-about-us"}>
                                {brandData.image}
                            </article>
                            <article className="story-about-us">
                                {brandData.content}
                            </article>
                        </>
                    }
                </div>
            </main>
        </>
        )
}

export default AboutUsPage;