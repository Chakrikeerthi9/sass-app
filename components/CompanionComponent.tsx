'use client'
import { cn, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import { CompanionComponentProps } from '@/types'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({companionId, subject, topic, name, userName, userImage, style, voice}: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [speaking, setSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(()=>{
        if(lottieRef){
            if(speaking){
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    },[speaking, lottieRef])

    useEffect(()=>{
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = () => {}

        const onError = (error: Error) => console.log('Error', error);

        const onSpeechStart = () => setSpeaking(true);

        const onSpeechEnd = () => setSpeaking(false);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    },[])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleConnect = async () => {

    }

    const handleDisconnect = async () => {
        
    }

  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='companion-section'>
            <div className='companion-avatar' style={{backgroundColor: getSubjectColor(subject)}}>
                <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                    <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} />
                </div>

                <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                    <Lottie 
                    lottieRef={lottieRef}
                    animationData={soundwaves}
                    autoplay={false}
                    className='companion-lottie'
                    />
                </div>
            </div>

            <p className='font-bold text-2xl'>{name}</p>
        </div>

        <div className='user-section'>
            <div className='user-avatar'>
                <Image src={userImage} alt={companionId} width={130} height={130} className='rounded-lg' />
                <p className='font-bold text-2xl'>{userName}</p>
            </div>

            <button className='btn-mic' onClick={toggleMicrophone}>
                <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='mic' width={36} height={36} />
                <p className='max-sm:hidden'>
                    {isMuted ? 'Turn on mic' : 'Turn off mic'}
                </p>
            </button>

            <button 
            className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')}
            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}
            >
                {
                    callStatus === CallStatus.ACTIVE ? 'End call' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Start session'
                }
            </button>
        </div>
      </section>
    </section>
  )
}

export default CompanionComponent
