import './AlertLogin.css'

interface ModalProps {
    isOpen: boolean;
}

function AlertLogin({ isOpen }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className='overlayLogin'>
            <div className='conteudoLogin'>
                <div className='headerLogin'>
                    <h2>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="40px" viewBox="0 0 20 20" width="40px" fill="#6CA11E"><g><rect fill="none" height="20" width="20" /></g><g><path d="M18,10l-1.77-2.03l0.25-2.69l-2.63-0.6l-1.37-2.32L10,3.43L7.53,2.36L6.15,4.68L3.53,5.28l0.25,2.69L2,10l1.77,2.03 l-0.25,2.69l2.63,0.6l1.37,2.32L10,16.56l2.47,1.07l1.37-2.32l2.63-0.6l-0.25-2.69L18,10z M8.59,13.07l-2.12-2.12l0.71-0.71 l1.41,1.41l4.24-4.24l0.71,0.71L8.59,13.07z" /></g></svg>
                        Conta autenticada com sucesso
                    </h2>
                </div>
                <div className='bodyLogin'>
                    <p>Um instante, iremos te redirecionar ao dashboard !</p>
                </div>
            </div>
        </div>
    )
}

export default AlertLogin