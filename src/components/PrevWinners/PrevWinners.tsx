import styles from "../../styles/Home.module.css";

const PrevWinners = () => {

    return (
        <div className={styles.container}>
            <table>
                <thead>
                <tr>
                    <th>Winner</th>
                    <th>Day</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Unknown</td>
                    <td>1</td>
                    <td>User1</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default PrevWinners;