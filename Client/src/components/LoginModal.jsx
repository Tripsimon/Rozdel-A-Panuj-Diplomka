import React from 'react'

function LoginModal() {
    return (
        <>
            <dialog id="loginModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-10 text-primary">Přihlášení</h3>
                    
                    <input type="text" placeholder="Email" className="input input-bordered w-full mb-5 " />
                    <input type="text" placeholder="Heslo" className="input input-bordered w-full mb-5" />
                    <div className="modal-action">
                        <form method="dialog">
                        <button className="btn text-primary mx-5">Přihlásit</button>
                            <button className="btn text-primary">Zavřít</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default LoginModal