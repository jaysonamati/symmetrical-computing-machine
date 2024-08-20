import { useRef, useEffect, useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { FixedSizeList } from 'react-window';

import Asset from "../components/Asset.js";

import "../styles/AssetBar.css";

function handleAssetOnClick(data) {
    console.log(`Asset ${data} clicked`)
}

function renderAsset(props) {
    const { index, style } = props;

    const GUTTER_SIZE = 5;

    return (
        <>
        <div className='asset-list-item'>
            <ListItem 
                alignItems='flex-start' 
                style={{...style, top: style.top + GUTTER_SIZE, left: style.left + GUTTER_SIZE, paddingLeft: GUTTER_SIZE}} 
                key={index}
                onClick={() => handleAssetOnClick(index)}
                component="div" 
                disablePadding
            >
                <ListItemAvatar>
                    <Avatar alt="Vehicle image" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={`Vehicle Registration no ${index + 1}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Vehicle nickname
                            </Typography>
                            {"- Some trip information and road condition"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
        </div>
        </>
    )
}

export default function AssetBar() {
    // const assets = assetData.map((asset) => {
    //     <Asset data={asset} />
    // });
    return(
        <>
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper', marginTop: 5}}
            >
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={80}
                    itemCount={200}
                    overscanCount={5}
                >
                    {renderAsset}
                </FixedSizeList>
            </Box>
        </>
    )
}