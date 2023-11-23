import styles from "./PrevWinners.module.css";

const PrevWinners = () => {

    return (
            <table className={styles.center}>
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
    )

}

export default PrevWinners;
