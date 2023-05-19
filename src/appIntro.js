import './appIntro.css'


function AppIntro(props) {

    

    return(
        <div className="AppIntroBody">

            
            <header>
                <h1>Welcome to the HBot</h1>
                <p>
                    Hbot is specifically designed for helping out people who need health realted
                    help , go ahead try it out.
                </p>
                <p onClick={props.change} id="checklink">check it out</p>
            </header>
            
            <img src="./Driod.png" alt="health driod"/>
            
        </div>
    );

}

export default AppIntro;