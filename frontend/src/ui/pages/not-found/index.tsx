import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="NotFoundPage">
            <h1>Not Found画面です</h1>
            <Link to="/signup">ホーム画面へ</Link>
        </div>
    );
}

export default NotFoundPage;
