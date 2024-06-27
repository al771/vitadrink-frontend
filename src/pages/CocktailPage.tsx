import React, {useEffect} from 'react';
import {Cocktail} from "../types/Cocktail";
import {useLoaderData} from "react-router-dom";
import {Button, Container} from "@salutejs/plasma-ui";
import Header from "../components/Header";
import {useAssistant} from "../contexts/AssistantContext";
import {AssistantAppState} from "@sberdevices/assistant-client";

function CocktailPage() {
    const cocktail: Cocktail = useLoaderData() as Cocktail;
    const { assistantRef, assistantStateRef, historyRef } = useAssistant()!;

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current = [...historyRef.current, location.pathname]
        } else {
            historyRef.current = [location.pathname]
        }
    }, [location]);

    console.log(cocktail);

    useEffect(() => {
        // assistantRef.current?.sendData({
        //     action: {
        //         action_id: "PAGE_OPEN",
        //         parameters: {
        //             recipe: cocktail.recipe,
        //             ingredients: cocktail.ingredients?.join(',')
        //         }
        //     }
        // });
    }, [cocktail]);

    return (
        <div style={{width: "100vw", minHeight: "100vh"}}>
            <Header back={true}></Header>
            <iframe
                className="bg-video"
                src={`https://www.youtube.com/embed/${cocktail.video?.split('watch?v=')[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cocktail.video?.split('watch?v=')[1]}`}
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    backgroundSize: 'cover',
                    background: 'no-repeat center',
                    marginLeft: '50vw',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    height: '100%',
                    width: '177.77777778vh', // 100 * 16 / 9
                    minWidth: '100%',
                    minHeight: '56.25vw', // 100 * 9 / 16
                    transform: "scale(1.1)",
                    margin: 0,
                    opacity: 0.1,
                    zIndex: 10,
                }}
            />
            <div style={{zIndex: 20}} className="mt-16 pb-44">
                <Container>
                    <h1 className="font-bold text-3xl mb-4">{cocktail.title}</h1>
                    <div className="flex mb-8">
                        <Button text="Начать готовить" size="s" view="primary" onClick={async () => {
                            assistantRef.current?.sendData({
                                action: {
                                    action_id: "START_COOK",
                                    parameters: {
                                        recipe: cocktail.recipe,
                                        ingredients: cocktail.ingredients?.join(',')
                                    }
                                }
                            })
                        }}/>
                    </div>
                    <h3 className="font-bold text-xl mb-4">Ингредиенты</h3>
                    <div className="mb-8">
                        {cocktail.ingredients?.map((el, i) => {
                            return <div className="flex max-w-sm mb-2 justify-between items-end" key={i}>
                                <div>{el.split(' - ')[0]}</div>
                                <div className="grow border-dotted border-b-2 mb-1 mx-2"></div>
                                <div>{el.split(' - ')[1]}</div>
                            </div>
                        })}
                    </div>

                    <h3 className="font-bold text-xl mb-4">Рецепт</h3>
                    <p className="whitespace-pre-line leading-8">{cocktail.recipe}</p>
                </Container>
            </div>
        </div>
    );
}

export default CocktailPage;