import React, {useEffect, useState} from 'react';
import {Cocktail} from "../types/Cocktail";
import {CarouselCol, CarouselGridWrapper, CarouselItem, CarouselLite, useRemoteHandlers} from "@salutejs/plasma-ui";
import CocktailCard from "./CocktailCard";
import {useSection} from "@salutejs/spatial";
import {useNavigate} from "react-router-dom";
import {useAssistant} from "../contexts/AssistantContext";

type CocktailListProps = {
    cocktails: Cocktail[];
};

function CocktailList({cocktails}: CocktailListProps) {
    const navigate = useNavigate();

    const [section] = useSection('CocktailList');
    const [keys, setKeys] = useState<string[]>([]);
    const { assistantRef } = useAssistant()!;

    const [index] = useRemoteHandlers({
        initialIndex: 0,
        axis: "x",
        delay: 30,
        longDelay: 150,
        min: 0,
        max: cocktails.length - 1,
    });

    useEffect(() => {

        //@eslint-ignore
        const keyHandler = function PultControl(e: any) {
            e.preventDefault();
            if(e.key.toLowerCase() == 'enter' || e.keyCode === 13) {
                console.log(e.key.toLowerCase(), e.keyCode === 13);
                navigate(`/cocktails/${cocktails[index]._id}`);
                assistantRef.current?.sendData({
                    action: {
                        action_id: "PAGE_OPEN",
                        parameters: {
                            recipe: cocktails[index].recipe,
                            ingredients: cocktails[index].ingredients?.join(',')
                        }
                    }
                });
            }
        }

        document.addEventListener('keydown', keyHandler, false);
        document.addEventListener('keyup', keyHandler, false);

        return () => {
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('keyup', keyHandler);
        }
    }, [index]);

    return (
        <div>
            <h2 className="font-bold text-3xl mb-4 mt-4">Популярные рецепты</h2>
            {keys.map((el, i) => {
                return <div key={i}>{el}</div>
            })}
            <CarouselGridWrapper>
                <CarouselLite
                    axis="x"
                    index={index}
                    scrollSnapType="mandatory"
                    scrollAlign="start"
                    paddingStart="true"
                    // detectActive
                    // detectThreshold={0.4}
                    style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', marginLeft: -8 }}
                    // onIndexChange={(i) => setIndex(i)}
                    {...section}
                >
                    {cocktails.map((cocktail, i) => (
                        <CarouselCol className="sn-section-item" tabIndex={-1} key={`item:${i}`} size={3} sizeL={2} scrollSnapAlign="start" style={{marginRight: 16}}>
                            <CocktailCard cocktail={cocktail} focused={i === index} />
                        </CarouselCol>
                    ))}
                </CarouselLite>
            </CarouselGridWrapper>
        </div>
    );
}

export default CocktailList;