(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,n,t){e.exports={App:"App_App__1IQbR"}},20:function(e,n,t){e.exports=t(30)},25:function(e,n,t){},30:function(e,n,t){"use strict";t.r(n);var u=t(0),l=t.n(u),r=t(6),o=t.n(r),s=(t(25),t(13)),a=t(14),i=t(18),c=t(15),d=t(1),m=t(19),I=t(16),x=t.n(I),p=t(7),y=function(e){return l.a.createElement("div",{style:{height:e.height+"px",boxSizing:"border-box",display:"flex",whiteSpace:"nowrap",background:"lightgray",padding:"5px",fontFamily:"Roboto Mono"}},e.index.toString(16).padStart(2,"0"),"\xa0",e.row.map(function(n,t){return l.a.createElement("div",{key:t,style:{fontFamily:"Roboto Mono",background:"lightgreen"}},l.a.createElement("span",{style:{background:e.isRowSelected&&2*t===e.curColumn?"pink":"",color:"white"}},n.note?n.note.label:"..."),l.a.createElement("span",{style:{background:e.isRowSelected&&2*t+1===e.curColumn?"pink":"",color:"blue"}},null!==n.instrumentIdx?n.instrumentIdx.toString(16).padStart(2,"0"):".."),l.a.createElement("span",null,"|"))}))},f={C4:{label:"C-4",frequency:261.6},Cs4:{label:"C#4",frequency:277.2},D4:{label:"D-4",frequency:293.7},Ds4:{label:"D#4",frequency:311.1},E4:{label:"E-4",frequency:329.6},F4:{label:"F-4",frequency:349.2},Fs4:{label:"F#4",frequency:370},G4:{label:"G-4",frequency:392},Gs4:{label:"G#4",frequency:415.3},A4:{label:"A-4",frequency:440},As4:{label:"A#4",frequency:466.2},B4:{label:"B-4",frequency:493.9},C5:{label:"C-5",frequency:523.3},Cs5:{label:"C#5",frequency:554.4},D5:{label:"D-5",frequency:587.3},Ds5:{label:"D#5",frequency:622.3},E5:{label:"E-5",frequency:659.3},F5:{label:"F-5",frequency:698.5},Fs5:{label:"F#5",frequency:740},G5:{label:"G-5",frequency:784},Gs5:{label:"G#5",frequency:830.6},A5:{label:"A-5",frequency:880},As5:{label:"A#5",frequency:932.3},B5:{label:"B-5",frequency:987.8},C6:{label:"C-6",frequency:1046.5},Cs6:{label:"C#6",frequency:1108.7},D6:{label:"D-6",frequency:1174.7},Ds6:{label:"D#6",frequency:1244.5},E6:{label:"E-6",frequency:1318.5},none:null},g={KeyQ:"C5",Digit2:"Cs5",KeyW:"D5",Digit3:"Ds5",KeyE:"E5",KeyR:"F5",Digit5:"Fs5",KeyT:"G5",Digit6:"Gs5",KeyY:"A5",Digit7:"As5",KeyU:"B5",KeyI:"C6",Digit9:"Cs6",KeyO:"D6",Digit0:"Ds6",KeyP:"E6",KeyZ:"C4",KeyS:"Cs4",KeyX:"D4",KeyD:"Ds4",KeyC:"E4",KeyV:"F4",KeyG:"Fs4",KeyB:"G4",KeyH:"Gs4",KeyN:"A4",KeyJ:"As4",KeyM:"B4",Comma:"C5",KeyL:"Cs5",Period:"D5",Semicolon:"Ds5",Slash:"E5",Backspace:"none"},h=function(e){function n(e){var t;Object(s.a)(this,n),(t=Object(i.a)(this,Object(c.a)(n).call(this,e))).state={curPos:0,curColumn:0,curSequenceIdx:0,curPlayingSequenceIdx:0,isPlaying:!1,selectedInstrumentIdx:0},t.componentDidMount=function(e){window.addEventListener("keydown",t.onKeyDown),window.addEventListener("mousedown",t.onMouseDown)},t.toggleIsRecording=function(e){t.props.toggleIsRecording()},t.getNumTracks=function(e){return t.props.patterns[0].rows[0].length},t.curColumnRight=function(e){var n=2*t.getNumTracks(),u=t.state.curColumn+1>n-1?n-1:t.state.curColumn+1;t.setState({curColumn:u})},t.curColumnLeft=function(e){t.setState({curColumn:t.state.curColumn-1<0?0:t.state.curColumn-1})},t.curPosNext=function(e){t.setState(function(e,n){var t=(e.curPos+1)%n.patterns[n.sequence[e.curSequenceIdx]].rows.length;return 0===t?{curSequenceIdx:(e.curSequenceIdx+1)%n.sequence.length,curPos:t}:{curPos:t}},function(){var e=t.rowHeight*t.state.curPos;t.patternRef.current.scrollTop=e})},t.curPosPrev=function(e){t.setState(function(e,n){var t=e.curPos-1;if(t<0){var u=e.curSequenceIdx-1<0?n.sequence.length-1:e.curSequenceIdx-1;return{curSequenceIdx:u,curPos:t=n.patterns[n.sequence[u]].rows.length-1}}return{curPos:t}},function(){var e=t.rowHeight*t.state.curPos;t.patternRef.current.scrollTop=e})},t.onMouseDown=function(e){e.preventDefault()},t.onKeyDown=function(e){switch(e.code){case"ArrowDown":t.state.isPlaying||t.curPosNext();break;case"ArrowUp":t.state.isPlaying||t.curPosPrev();break;case"ArrowLeft":t.curColumnLeft();break;case"ArrowRight":t.curColumnRight();break;case"Enter":t.togglePlay();break;case"Space":t.props.toggleIsRecording();break;case"KeyZ":case"KeyS":case"KeyX":case"KeyD":case"KeyC":case"KeyV":case"KeyG":case"KeyB":case"KeyH":case"KeyN":case"KeyJ":case"KeyM":case"Comma":case"KeyL":case"Period":case"Semicolon":case"Slash":case"KeyQ":case"Digit2":case"KeyW":case"Digit3":case"KeyE":case"KeyR":case"Digit5":case"KeyT":case"Digit6":case"KeyY":case"Digit7":case"KeyU":case"KeyI":case"Digit9":case"KeyO":case"Digit0":case"KeyP":case"Backspace":if(t.playNote(f[g[e.code]]),t.props.isRecording){var n=f[g[e.code]],u=Math.floor(t.state.curColumn/2),l=t.state.selectedInstrumentIdx;t.props.recordNote(n,l,t.state.curPos,u,t.props.patterns[t.props.sequence[t.state.curSequenceIdx]].id)}}},t.scheduleNote=function(e,n){t.notesInQueue.push({pos:e,time:n});for(var u=0;u<t.getNumTracks();u++){var l=t.props.patterns[t.props.sequence[t.state.curPlayingSequenceIdx]].rows[e][u],r=l.note;if(null!==r){var o=r.frequency,s=t.audioContext.createOscillator(),a=t.audioContext.createGain();a.connect(t.masterGainNode),s.connect(a);var i=t.props.instruments[l.instrumentIdx];s.type=i.label,s.frequency.value=o,a.gain.setTargetAtTime(0,t.noteLength,.5),s.start(n),s.stop(n+t.noteLength)}}},t.scheduler=function(e){for(;t.nextNoteTime<t.audioContext.currentTime+t.lookAheadSeconds;)t.scheduleNote(t.nextPos,t.nextNoteTime),t.nextNoteTime+=.135,t.setState(function(e,n){if(t.nextPos=(t.nextPos+1)%n.patterns[n.sequence[e.curPlayingSequenceIdx]].rows.length,0===t.nextPos)return{curPlayingSequenceIdx:(e.curPlayingSequenceIdx+1)%n.sequence.length}});t.timer=setTimeout(t.scheduler,t.lookAheadSeconds)},t.updatePos=function(e){for(var n=t.audioContext.currentTime;t.notesInQueue.length&&t.notesInQueue[0].time<n;)t.lastPosDrawn!==t.notesInQueue[0].pos&&(t.curPosNext(),t.lastPosDrawn=t.notesInQueue[0].pos),t.notesInQueue.splice(0,1);requestAnimationFrame(t.updatePos)},t.play=function(e){t.setState({isPlaying:!0}),t.nextNoteTime=t.audioContext.currentTime,t.nextPos=t.state.curPos,t.lastPosDrawn=t.state.curPos,t.setState(function(e,n){return{curPlayingSequenceIdx:e.curSequenceIdx}}),t.scheduler(),t.updatePos()},t.stop=function(e){t.setState({isPlaying:!1}),clearTimeout(t.timer)},t.togglePlay=function(e){t.state.isPlaying?t.stop():t.play()},t.onSelectInstrument=function(e){t.setState({selectedInstrumentIdx:e})},t.extendSequence=function(e){t.props.addPatternToSequence(0)},t.shortenSequence=function(e){t.props.removePatternFromSequence()},t.incrementSequencePatternId=function(e){var n=t.props.sequence[t.state.curSequenceIdx]+1;t.props.patterns.find(function(e){return e.id===n})||t.props.createNewPattern(n,t.getNumTracks()),t.props.setSequencePatternId(t.state.curSequenceIdx,n)},t.decrementSequencePatternId=function(e){var n=t.props.sequence[t.state.curSequenceIdx]-1;n>=0&&t.props.setSequencePatternId(t.state.curSequenceIdx,n)},t.onSelectSequenceIdx=function(e){t.setState({curPos:0,curSequenceIdx:e})},t.patternRef=l.a.createRef(),t.audioContext=new(window.AudioContext||window.webkitAudioContext),t.nextPos=0,t.nextNoteTime=0,t.lookAheadSeconds=.1,t.notesInQueue=[],t.lastPosDrawn=0,t.noteLength=.5;var u=t.audioContext.createGain();return u.gain.value=.5,u.connect(t.audioContext.destination),t.masterGainNode=u,t.rowHeight=31,t.onKeyDown=t.onKeyDown.bind(Object(d.a)(t)),t.onMouseDown=t.onMouseDown.bind(Object(d.a)(t)),t}return Object(m.a)(n,e),Object(a.a)(n,[{key:"playNote",value:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e!==f.none){var n=this.audioContext.createOscillator(),t=this.audioContext.createGain();n.type=this.props.instruments[this.state.selectedInstrumentIdx].label,t.connect(this.masterGainNode),n.connect(t),n.frequency.value=e.frequency;var u=this.audioContext.currentTime;t.gain.setTargetAtTime(0,this.noteLength,.5),n.start(u),n.stop(u+this.noteLength)}}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:x.a.App},l.a.createElement("div",null,"pattern: ",this.props.sequence[this.state.curSequenceIdx]),l.a.createElement("ul",{style:{fontFamily:"Roboto Mono",listStyle:"none",background:"lightyellow",display:"inline-block",paddingLeft:"0"}},this.props.sequence.map(function(n,t){return l.a.createElement("li",{key:t,onClick:function(){return e.onSelectSequenceIdx(t)},style:t===e.state.curSequenceIdx?{background:"yellow"}:{}},t,"| ",n)})),l.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",width:"100px"}},l.a.createElement("button",{style:{gridColumn:"1 / 3"},onClick:this.extendSequence},"Insert"),l.a.createElement("button",{style:{gridColumn:"1 / 3"},onClick:this.shortenSequence},"Delete"),l.a.createElement("button",{onClick:this.incrementSequencePatternId},"+"),l.a.createElement("button",{onClick:this.decrementSequencePatternId},"-")),l.a.createElement("button",{onClick:this.toggleIsRecording},this.props.isRecording?"is recording":"is not recording"),l.a.createElement("button",{onClick:function(){return e.props.addRow(e.props.patterns[e.state.curSequenceIdx].id,e.getNumTracks())}},"Add Row"),l.a.createElement("button",{onClick:function(){return e.props.subRow(e.props.patterns[e.state.curSequenceIdx].id)}},"Sub Row"),l.a.createElement("button",{onClick:this.props.addTrack},"Add Track"),l.a.createElement("button",{onClick:this.props.subTrack},"Sub Track"),l.a.createElement("button",{style:{display:"block"},onClick:this.togglePlay},this.state.isPlaying?"Stop":"Play"),l.a.createElement("select",{style:{background:"blue"},onChange:function(n){e.onSelectInstrument(n.target.value)},value:this.state.selectedInstrumentIdx},this.props.instruments.map(function(e,n){return l.a.createElement("option",{key:n,value:n},e.label)})),l.a.createElement("div",{ref:this.patternRef,style:{boxSizing:"border-box",background:"lightgray",padding:"35vh 0",overflowY:"scroll",height:"70vh",width:"99%",position:"absolute",bottom:"0"}},this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].rows.map(function(n,t){return l.a.createElement(y,{height:e.rowHeight,key:t,index:t,row:n,isRowSelected:t===e.state.curPos,curColumn:e.state.curColumn})})))}}]),n}(l.a.Component),b=Object(p.b)(function(e){return{isRecording:e.isRecording,patterns:e.patterns,sequence:e.sequence,instruments:e.instruments}},function(e){return{toggleIsRecording:function(){return e({type:"TOGGLE_IS_RECORDING"})},addRow:function(n,t){return e({type:"ADD_ROW",payload:{patternId:n,numTracks:t}})},subRow:function(n){return e({type:"SUBTRACT_ROW",payload:{patternId:n}})},addTrack:function(){return e({type:"ADD_TRACK"})},subTrack:function(){return e({type:"SUBTRACT_TRACK"})},recordNote:function(n,t,u,l,r){return e({type:"RECORD_NOTE",payload:{note:n,instrumentIdx:t,pos:u,trackNum:l,patternId:r}})},play:function(){return e({type:"PLAY"})},addPatternToSequence:function(n){return e({type:"ADD_PATTERN_TO_SEQUENCE",payload:{patternId:n}})},removePatternFromSequence:function(n){return e({type:"REMOVE_PATTERN_FROM_SEQUENCE"})},setSequencePatternId:function(n,t){return e({type:"SET_PATTERN_ID",payload:{idx:n,patternId:t}})},createNewPattern:function(n,t){return e({type:"CREATE_NEW_PATTERN",payload:{newPatternId:n,numTracks:t}})}}})(h);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=t(3),S=t(4),q=[0,1],C=[{id:0,rows:[[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.F5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:f.G5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.C5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.A5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:f.As5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.A5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.F5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.A5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D6,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:f.C5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.C5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:f.A4,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.E5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}]]},{id:1,rows:[[{note:f.E5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:f.D5,instrumentIdx:0},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}],[{note:null,instrumentIdx:null},{note:null,instrumentIdx:null}]]}],E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_TRACK":return Object(S.a)({},e,{rows:e.rows.map(function(e){return e.concat({note:null,instrumentIdx:null})})});case"SUBTRACT_TRACK":return Object(S.a)({},e,{rows:e.rows.map(function(e){return e.filter(function(n,t){return t!==e.length-1})})});case"ADD_ROW":if(e.id===n.payload.patternId){for(var t=[],u=0;u<n.payload.numTracks;u++)t.push({note:null,instrumentIdx:null});return Object(S.a)({},e,{rows:e.rows.concat([t])})}return e;case"SUBTRACT_ROW":return e.id===n.payload.patternId?Object(S.a)({},e,{rows:e.rows.filter(function(n,t){return t!==e.rows.length-1})}):e;case"RECORD_NOTE":return e.id===n.payload.patternId?Object(S.a)({},e,{rows:e.rows.map(function(e,t){return t===n.payload.pos?e.map(function(e,t){return t===n.payload.trackNum?{note:n.payload.note,instrumentIdx:n.payload.instrumentIdx}:e}):e})}):e;default:return e}},P=[{label:"sawtooth"},{label:"triangle"},{label:"sine"},{label:"square"}],D=Object(w.b)({curPos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;switch((arguments.length>1?arguments[1]:void 0).type){case"CUR_POS_NEXT":return e+1;case"CUR_POS_PREV":return e-1<0?0:e-1;default:return e}},isRecording:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return"TOGGLE_IS_RECORDING"===(arguments.length>1?arguments[1]:void 0).type?!e:e},patterns:function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_NEW_PATTERN":for(var u=[],l=t.payload.numTracks,r=0;r<5;r++){u[r]=[];for(var o=0;o<l;o++)u[r].push({note:null,instrumentIdx:null})}e=n.concat({id:t.payload.newPatternId,rows:u});break;default:e=n}return e.map(function(e){return E(e,t)})},sequence:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_PATTERN_TO_SEQUENCE":return e.concat(n.payload.patternId);case"REMOVE_PATTERN_FROM_SEQUENCE":return e.filter(function(n,t){return t!==e.length-1});case"SET_PATTERN_ID":return e.map(function(e,t){return t===n.payload.idx?n.payload.patternId:e});default:return e}},instruments:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P;arguments.length>1&&arguments[1];return e}}),T=Object(w.c)(D);o.a.render(l.a.createElement(p.a,{store:T},l.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.06965aeb.chunk.js.map