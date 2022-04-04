import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';

// -- Detail Pane ----------------------------------------------------------------------
interface Details_props {
    planet: string;
    back: ()=>void;
}
export const Details: FunctionComponent<Details_props> = (props) =>
{
    const[info, setInfo] = useState('');
    const[img, setImgUrl] = useState('');

    useEffect(() => 
    {
        axios.get('https://en.wikipedia.org/w/api.php',
        {
            params: {
                format:'json',
                action:'query',
                prop:'extracts',
                exintro:'',
                explaintext:'',
                redirects:1,
                titles:props.planet,
                origin:'*'
            }
        }).then(function (response) {
            let page = Object.keys(response.data.query.pages)[0];
            let data = response.data.query.pages[page];
            setInfo(data.extract);
        }).catch(function (error) { console.log(error) });

        axios.get('https://en.wikipedia.org/w/api.php',
        {
            params: {
                format:'json',
                action:'query',
                prop:'pageimages',
                piprop:'original',
                titles:props.planet,
                origin:'*'
            }
        })
            .then(function (response) {
                let page = Object.keys(response.data.query.pages)[0];
                let imgUrl = response.data.query.pages[page].original.source;
                setImgUrl(imgUrl);
            })
            .catch(function (error) { console.log(error) });

    },[props.planet]);

    return (
        <div >
            <div className={'planetImg'}>
                <img src={img} width='100%' />
            </div>
            <div className={'detailText'}>
                {info}
                <div className={'item backBtn'} onClick={ () => props.back()}>Back</div>
            </div>

        </div>
    )
}