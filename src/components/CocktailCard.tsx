import React from 'react';
import {Card, CardBody, CardContent, CardMedia, TextBox, TextBoxBigTitle} from "@salutejs/plasma-ui";
import {Link, useNavigate} from "react-router-dom";
import {Cocktail} from "../types/Cocktail";
import {useAssistant} from "../contexts/AssistantContext";

type CocktailCardProps = {
    cocktail: Cocktail;
    focused: boolean;
};
function CocktailCard({cocktail, focused}: CocktailCardProps) {
    const navigate = useNavigate();
    const { assistantRef } = useAssistant()!;
    return (
        <Link to={`/cocktails/${cocktail._id}`} onClick={(e) => {
            e.preventDefault();
            navigate(`/cocktails/${cocktail._id}`);
            assistantRef.current?.sendData({
                action: {
                    action_id: "PAGE_OPEN",
                    parameters: {
                        recipe: cocktail.recipe,
                        ingredients: cocktail.ingredients?.join(',')
                    }
                }
            });
        }}>
            <Card
                style={{ width: '100%', marginLeft: '0.75rem' }}
                focused={focused}
                scaleOnFocus={true}
            >
                <CardBody>
                    <CardMedia
                        src={cocktail.image}
                        placeholder="cocktail"
                        ratio="3 / 4"
                    />
                    <CardContent cover>
                        <TextBox>
                            <TextBoxBigTitle>{cocktail.title}</TextBoxBigTitle>
                        </TextBox>
                    </CardContent>
                </CardBody>
            </Card>
        </Link>
    );
}

export default CocktailCard;