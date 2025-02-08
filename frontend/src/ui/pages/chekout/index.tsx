import { Link } from "react-router-dom";

function CheckOutPage() {
    return (
        <div className="CheckOutPage">
            <h1>チェックアウト画面です</h1>
            <Link to="/">ホーム画面へ</Link>
        </div>
    );
}

export default CheckOutPage;
