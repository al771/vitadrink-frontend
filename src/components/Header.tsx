import React from 'react';
import {Container, HeaderBack, HeaderRoot, HeaderSubtitle, HeaderTitle, HeaderTitleWrapper} from "@salutejs/plasma-ui";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    back: boolean;
}

function Header({back}: HeaderProps) {
    const navigate = useNavigate();

    function onBackClick() {
        navigate('/');
    }

    return (
        <div>
            <Container>
                <HeaderRoot className="mt-8 p-0" style={{padding: 0}}>
                    {back && <HeaderBack onClick={onBackClick}/>}
                    <div className="rounded-xl w-12 overflow-hidden mr-4">
                        <img src="/logo.jpg" alt="logo" className="object-cover object-center" style={{transform: "scale(1.2) translateX(-1.5px)"}} />
                    </div>
                    <HeaderTitleWrapper>
                        <HeaderTitle>Рецепты полезных напитков</HeaderTitle>
                    </HeaderTitleWrapper>
                </HeaderRoot>
            </Container>

            <div className="mb-4"></div>
        </div>
    );
}

export default Header;