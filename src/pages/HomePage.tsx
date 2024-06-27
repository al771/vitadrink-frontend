import React, {useEffect, useState} from 'react';
import {Cocktail} from "../types/Cocktail";
import {getCocktails} from "../api/getCocktails";
import Header from "../components/Header";
import {Container, Spinner} from "@salutejs/plasma-ui";
import CocktailList from "../components/CocktailList";
import {useNavigate, useLocation} from "react-router-dom";
import {useAssistant} from "../contexts/AssistantContext";
import { router } from '../router';
import {AssistantSmartAppData, AssistantSmartAppError} from "@sberdevices/assistant-client";

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [cocktails, setCocktails] = useState<Cocktail[] | null>(null);

    const [dataString, setDataString] = useState('');

    // const assistantRef = useRef<ReturnType<typeof createAssistant>>();
    const { assistantRef, assistantStateRef, initializeAssistant, historyRef } = useAssistant()!;

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current = [...historyRef.current, location.pathname]
        } else {
            historyRef.current = [location.pathname]
        }
    }, [location]);

    useEffect(() => {
        const res = getCocktails();

        setCocktails([...res]);

        assistantStateRef.current = {
            item_selector: {
                items: res!.map((el, i) => {
                    return {
                        ...el,
                        number: i + 1,
                        id: el._id,
                    };
                })
            }
        };

        assistantRef.current = initializeAssistant(() => assistantStateRef.current);

        // @ts-ignore
        assistantRef.current.on('data', (data) => {
            if (data.type === "smart_app_data") {
                // @ts-ignore
                if (data.action.type === "goto_drink") {
                    // @ts-ignore
                    navigate(`/cocktails/${data.action.id}`); // @ts-ignore
                } else if (data.action.type === "goto_home") {
                    navigate(`/`);
                }
            }
        });

        if (historyRef.current?.length >= 2 && historyRef.current[historyRef.current.length - 2].includes('cocktails')) {
            console.log("OPEN_MENU_BTN event sent");
            assistantRef.current?.sendData({
                action: {
                    action_id: "OPEN_MENU_BTN"
                }
            });
        }
    }, []);

    if (!cocktails) {
        return (
            <div style={{width: "100vw", minHeight: "100vh"}}>
                <Header back={false}></Header>
                <Container className="flex items-center justify-center min-h-screen">
                    <Spinner size={32} />
                </Container>
            </div>
        );
    }

    return (
        <div style={{width: "100vw", minHeight: "100vh"}}>
            <Header back={false}></Header>
            <Container>
                <CocktailList cocktails={cocktails}/>
            </Container>
        </div>
    );
}

export default HomePage;