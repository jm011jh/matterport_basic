export default async function initTags(sdk: any) {
    
    var onetimePush = true;
    const tagArr : any[] = []
    const tagPosArr : any[] = []
    const tagIdArr : any[] = []

    const tagArr_fontId_tag : any[] = []
    const tagArr_fontId_video : any[] = []
    const tagArr_fontId_link : any[] = []
    const tagArr_fontId_down : any[] = []
    const tagArr_fontId_up : any[] = []
    const tagArr_fontId_right : any[] = []

    await sdk.Asset.registerTexture('tag_icon_tag', '/assets/img/mp_tag_icon_tag.png');
    await sdk.Asset.registerTexture('tag_icon_tag_hover', '/assets/img/mp_tag_icon_tag_hover.png');
    await sdk.Asset.registerTexture('tag_icon_video', '/assets/img/mp_tag_icon_video.png');
    await sdk.Asset.registerTexture('tag_icon_video_hover', '/assets/img/mp_tag_icon_video_hover.png');
    await sdk.Asset.registerTexture('tag_icon_link', '/assets/img/mp_tag_icon_link.png');
    await sdk.Asset.registerTexture('tag_icon_link_hover', '/assets/img/mp_tag_icon_link_hover.png');
    await sdk.Asset.registerTexture('tag_icon_down', '/assets/img/mp_tag_icon_down.png');
    await sdk.Asset.registerTexture('tag_icon_down_hover', '/assets/img/mp_tag_icon_down_hover.png');
    await sdk.Asset.registerTexture('tag_icon_up', '/assets/img/mp_tag_icon_up.png');
    await sdk.Asset.registerTexture('tag_icon_up_hover', '/assets/img/mp_tag_icon_up_hover.png');
    await sdk.Asset.registerTexture('tag_icon_right', '/assets/img/mp_tag_icon_right.png');
    await sdk.Asset.registerTexture('tag_icon_right_hover', '/assets/img/mp_tag_icon_right_hover.png');

    try {
        await sdk.Tag.data.subscribe({
            onAdded(_index: any, item: any, _collection: any) {
                // sdk.Tag.editBillboard(item.id,{
                //     description: item.description,
                // })
                sdk.Tag.editStem(item.id, {stemVisible: false});
                if(item.fontId === 'tag') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_tag')
                    tagArr_fontId_tag.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking: true,
                        opening: true,
                        sharing: false,
                        navigating: true,
                    })
                } else if(item.fontId === 'video') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_video')
                    tagArr_fontId_video.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking:false,
                        opening: false,
                        sharing: false,
                        navigating: false,
                    })
                } else if (item.fontId === 'link') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_link')
                    tagArr_fontId_link.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking:true,
                        opening: true,
                        sharing: false,
                        navigating: true,
                    })
                } else if (item.fontId === 'arrow-alt-circle-down') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_down')
                    tagArr_fontId_down.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking: true,
                        opening: true,
                        sharing: false,
                        navigating: true,
                    })
                } else if (item.fontId === 'arrow-alt-circle-up') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_up')
                    tagArr_fontId_up.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking: true,
                        opening: true,
                        sharing: false,
                        navigating: true,
                    })
                } else if (item.fontId === 'arrow-alt-circle-right') {
                    sdk.Tag.editIcon(item.id, 'tag_icon_right')
                    tagArr_fontId_right.push(item)
                    sdk.Tag.allowAction(item.id,{
                        docking: true,
                        opening: true,
                        sharing: false,
                        navigating: true,
                    })
                }
                else {
                    // console.log(item.fontId)
                }
    
            },
            onCollectionUpdated(collection : any) {
                if(onetimePush){

                    tagIdArr.length = 0
                    tagArr.length = 0
                    tagPosArr.length = 0
                    for(let tag of collection ) {
                        tagIdArr.push(tag[0])
                        tagArr.push({...tag[1]})
                        tagPosArr.push({...tag[1].anchorPosition})
                    }
                    
                }
                onetimePush = false;
            }
        })

        await sdk.Tag.openTags.subscribe({
            prevState: {
                hovered: null, // 태그 호버 여부
                docked: null, // 태크 클릭 시 나오는 더보기 팝업
                selected: null, // 태그 클릭 후 포커싱 여부
            },
            onChanged(newState: any) {
                
                if (newState.hovered !== this.prevState.hovered) {
                    if (newState.hovered) {
                        tagArr_fontId_tag.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_tag_hover') : '')
                        tagArr_fontId_video.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_video_hover') : '')
                        tagArr_fontId_link.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_link_hover') : '')
                        tagArr_fontId_down.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_down_hover') : '')
                        tagArr_fontId_up.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_up_hover') : '')
                        tagArr_fontId_right.map(item => item.id == newState.hovered ? sdk.Tag.editIcon(newState.hovered, 'tag_icon_right_hover') : '')
                        // tagArr_fontId_video.forEach(item => { if(item.id == newState.hovered) { sdk.Tag.editIcon(item.id, 'tag_icon_video_hover') } })
                    } else {
                        tagArr_fontId_tag.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_tag') : '')
                        tagArr_fontId_video.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_video') : '')
                        tagArr_fontId_link.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_link') : '')
                        tagArr_fontId_down.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_down') : '')
                        tagArr_fontId_up.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_up') : '')
                        tagArr_fontId_right.map(item => item.id == this.prevState.hovered ? sdk.Tag.editIcon(this.prevState.hovered, 'tag_icon_right') : '')
                    }
                }
                // if (newState.docked !== this.prevState.docked) {
                //     if (newState.docked) {
                //         el_mp_interface_minimap.classList.add('close')
                //         el_mp_interface_minimap_inner.classList.add('close')
                //         el_mp_interface_minimap_menu.classList.add('close')
                //         el_mp_interface_floor.classList.add('close')
                //     } else {
                //         el_mp_interface_minimap.classList.remove('close')
                //         el_mp_interface_minimap_inner.classList.remove('close')
                //         el_mp_interface_minimap_menu.classList.remove('close')
                //         el_mp_interface_floor.classList.remove('close')
                //     }
                // }
                // only compare the first 'selected' since only one tag is currently supported
                const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
                if (selected !== this.prevState.selected) {
                    if (selected) {
    
                        if(tagArr_fontId_video.some(item => item.id == selected)) {

                            console.log("video tag selected")
    
                        }
                        
                    } else {
                        // console.log(this.prevState.selected, 'was deselected');
                    }
                }
    
                // clone and store the new state
                this.prevState = {
                    ...newState,
                    selected,
                };
            },
        })
    } catch (e) {
        console.error(e);
    }
}
