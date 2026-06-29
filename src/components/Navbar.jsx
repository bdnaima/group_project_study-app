import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Håller koll på vilken sida användaren är på just nu

    // Kollar om användaren är på login- eller register-sidan
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    const handleLogout = () => {
        navigate('/login');
    };

    // Funktioner för animationer vid hover
    const handleMouseEnterLink = (e) => {
        e.target.style.opacity = '0.6';
        e.target.style.transform = 'translateY(-1px)';
    };

    const handleMouseLeaveLink = (e) => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
    };

    const handleMouseEnterBtn = (e) => {
        e.target.style.backgroundColor = '#333';
        e.target.style.transform = 'scale(1.05)';
    };

    const handleMouseLeaveBtn = (e) => {
        e.target.style.backgroundColor = '#000';
        e.target.style.transform = 'scale(1)';
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                StudyApp
            </div>

            {/* Om användaren är på en auth-sida, ritas inte länkarna och knappen ut alls */}
            {!isAuthPage && (
                <div style={styles.navLinks}>
                    <Link 
                        to="/dashboard" 
                        style={styles.link}
                        onMouseEnter={handleMouseEnterLink}
                        onMouseLeave={handleMouseLeaveLink}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/tasks" 
                        style={styles.link}
                        onMouseEnter={handleMouseEnterLink}
                        onMouseLeave={handleMouseLeaveLink}
                    >
                        Tasks
                    </Link>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseEnter={handleMouseEnterBtn}
                        onMouseLeave={handleMouseLeaveBtn}
                    >
                        Log out
                    </button>
                </div>
            )}
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#fff',
        borderBottom: '2px solid #000',
        fontFamily: 'sans-serif'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#000'
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    link: {
        textDecoration: 'none',
        color: '#000',
        fontSize: '15px',
        fontWeight: '600',
        display: 'inline-block',
        transition: 'all 0.2s ease-in-out'
    },
    logoutBtn: {
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out'
    }
};

export default Navbar;