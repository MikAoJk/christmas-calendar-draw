import styles from "./PrevWinners.module.css";

const PrevWinners = () => {

    return (
        <div className={styles.main}>
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
                    <td>money</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default PrevWinners;
