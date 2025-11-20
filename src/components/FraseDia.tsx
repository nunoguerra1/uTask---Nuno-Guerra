import './FraseDia.css'
import { useEffect, useState } from 'react'

const FRASE_URL = `https://api.adviceslip.com/advice`;

const TRADUCAO_URL = `https://api.mymemory.translated.net/get?`;

interface AdviceSlip {
    slip: {
        id: number;
        advice: string;
    }
}

interface TranslationResponse {
    responseData: {
        translatedText: string;
    }
}

function FraseDia() {

    const [advice, setAdvice] = useState<string>('Carregando frase motivacional...');
    const [carregando, setCarregando] = useState<boolean>(true);
    const [modalAberto, setModalAberto] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setCarregando(true);
            try {
                const adviceResult = await fetch(FRASE_URL);
                const adviceData: AdviceSlip = await adviceResult.json();
                const englishAdvice = adviceData.slip.advice;
                const encondedAdvice = encodeURIComponent(englishAdvice);
                const translatedURL = `${TRADUCAO_URL}q=${encondedAdvice}&langpair=en|pt`;
                const translatedResult = await fetch(translatedURL);
                const translatedData: TranslationResponse = await translatedResult.json();
                const portuguesAdvice = translatedData.responseData.translatedText;
                setAdvice(portuguesAdvice);
            } catch (error) {
                console.error("Erro na busca ou tradução:", error);
                setAdvice('O mundo precisa de pessoas que amem o que fazem');
            } finally {
                setCarregando(false);
            }
        };
        fetchData();
    }, []);

    const toggleModal = () => {
        setModalAberto(!modalAberto);
    };

    return (
        <>
            <div className='AdviceBox'>
                <div className='AdviceHeader'>
                    <div className='fundoIcone'>
                        <div className='iconeWrapper'>
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFC107" className='iconeLampada'><rect fill="none" height="24" width="24" y="0" /><path d="M7,20h4c0,1.1-0.9,2-2,2S7,21.1,7,20z M5,19h8v-2H5V19z M16.5,9.5c0,3.82-2.66,5.86-3.77,6.5H5.27 C4.16,15.36,1.5,13.32,1.5,9.5C1.5,5.36,4.86,2,9,2S16.5,5.36,16.5,9.5z M14.5,9.5C14.5,6.47,12.03,4,9,4S3.5,6.47,3.5,9.5 c0,2.47,1.49,3.89,2.35,4.5h6.3C13.01,13.39,14.5,11.97,14.5,9.5z M21.37,7.37L20,8l1.37,0.63L22,10l0.63-1.37L24,8l-1.37-0.63L22,6 L21.37,7.37z M19,6l0.94-2.06L22,3l-2.06-0.94L19,0l-0.94,2.06L16,3l2.06,0.94L19,6z" /></svg>
                        </div>
                    </div>
                    <span className='HeaderText'>Frase do dia</span>
                </div>
                <p className='frase'>
                    {carregando ? (
                        <span className='carregandoTexto'>Buscando inspiração...</span>
                    ) : (
                        advice
                    )}
                </p>
            </div>

            <div className='AdviceButtonMobile' onClick={toggleModal}>
                <div className='fundoIconeMobile'>
                    <div className='iconeWrapperMobile'>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFC107" className='iconeLampadaMobile'><rect fill="none" height="24" width="24" y="0" /><path d="M7,20h4c0,1.1-0.9,2-2,2S7,21.1,7,20z M5,19h8v-2H5V19z M16.5,9.5c0,3.82-2.66,5.86-3.77,6.5H5.27 C4.16,15.36,1.5,13.32,1.5,9.5C1.5,5.36,4.86,2,9,2S16.5,5.36,16.5,9.5z M14.5,9.5C14.5,6.47,12.03,4,9,4S3.5,6.47,3.5,9.5 c0,2.47,1.49,3.89,2.35,4.5h6.3C13.01,13.39,14.5,11.97,14.5,9.5z M21.37,7.37L20,8l1.37,0.63L22,10l0.63-1.37L24,8l-1.37-0.63L22,6 L21.37,7.37z M19,6l0.94-2.06L22,3l-2.06-0.94L19,0l-0.94,2.06L16,3l2.06,0.94L19,6z" /></svg>
                    </div>
                </div>
                <span className='HeaderTextMobile'>Frase do dia</span>
            </div>

            {modalAberto && (
                <div className="modalOverlay" onClick={toggleModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <div className='AdviceBoxModal'>
                            <button className="fecharModalBtn" onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 0 24 24" width="38px" fill="#3867D6">
                                    <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
                                </svg>
                            </button>

                            <div className='AdviceHeaderModal'>
                                <div className='fundoIconeModal'>
                                    <div className='iconeWrapperModal'>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFC107" className='iconeLampadaModal'><rect fill="none" height="24" width="24" y="0" /><path d="M7,20h4c0,1.1-0.9,2-2,2S7,21.1,7,20z M5,19h8v-2H5V19z M16.5,9.5c0,3.82-2.66,5.86-3.77,6.5H5.27 C4.16,15.36,1.5,13.32,1.5,9.5C1.5,5.36,4.86,2,9,2S16.5,5.36,16.5,9.5z M14.5,9.5C14.5,6.47,12.03,4,9,4S3.5,6.47,3.5,9.5 c0,2.47,1.49,3.89,2.35,4.5h6.3C13.01,13.39,14.5,11.97,14.5,9.5z M21.37,7.37L20,8l1.37,0.63L22,10l0.63-1.37L24,8l-1.37-0.63L22,6 L21.37,7.37z M19,6l0.94-2.06L22,3l-2.06-0.94L19,0l-0.94,2.06L16,3l2.06,0.94L19,6z" /></svg>
                                    </div>
                                </div>
                                <span className='HeaderTextModal'>Frase do dia</span>
                            </div>
                            <p className='fraseModal'>
                                {carregando ? (
                                    <span className='carregandoTextoModal'>Buscando inspiração...</span>
                                ) : (
                                    advice
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FraseDia