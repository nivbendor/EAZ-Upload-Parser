export function Card({ className, ...props }) {
    return (
        <div className={`bg-white rounded-lg shadow ${className}`} {...props} />
    );
}

export function CardHeader(props) {
    return <div className="p-6" {...props} />;
}

export function CardTitle(props) {
    return <h3 className="text-lg font-semibold" {...props} />;
}

export function CardContent(props) {
    return <div className="p-6 pt-0" {...props} />;
}