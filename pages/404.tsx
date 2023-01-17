const Page404 = () => {
    return <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100vw',
            height: 'calc(100vh - 128px)',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            fontSize: '50px'
        }}
    >
        <div style={{
            display: 'flex',
            flexDirection:'column',
            alignItems:'center'
        }}> <div>
            404
        </div>
            <div
                style={{
                    marginLeft: 20,
                    fontSize: '30px'

                }}
            >You might be in the wrong place...</div>
        </div>
    </div>
}
export default Page404