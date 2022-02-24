import React from "react"

type Props = {
    children: React.ReactNode;
}

const MyCard = ({children}: Props) => {
    return (
        <div className="p-5 rounded bg-white shadow-sm mt-4">            
            {children}
        </div>

    )
}

export default MyCard;