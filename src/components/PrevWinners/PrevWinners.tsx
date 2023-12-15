const PrevWinners = () => {

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-xl text-left rtl:text-right">
                <thead className="text-m uppercase">
                <tr>
                    <th scope="col" className="px-6 py-3">Winner</th>
                    <th scope="col" className="px-6 py-3">Day</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b dark:border-gray-700">
                    <td className="px-6 py-4">Unknown</td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">money</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default PrevWinners;
