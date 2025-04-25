'use client';
import React from 'react';
import axios from 'axios';

function Page() {
  const makeCall = async () => {
    const headers = {
      Authorization: 'org_7830665337fefb1807cb01268b77c7d83418bdeeedbc427d44d2a02e1b8223c2691ed7a5819a0eecd4fc69',
    };

    const data ={
        "phone_number": "+919324379778",
        "voice": "June",
        "wait_for_greeting": false,
        "record": true,
        "answered_by_enabled": true,
        "noise_cancellation": false,
        "interruption_threshold": 100,
        "block_interruptions": false,
        "max_duration": 12,
        "model": "base",
        "language": "en",
        "background_track": "none",
        "endpoint": "https://api.bland.ai",
        "voicemail_action": "hangup",
        "pathway_id": "c53cd67a-0eb7-4820-88ae-1112dba9b95f"
      }
    try {
      const res = await axios.post('https://api.bland.ai/v1/calls', data, { headers });
      console.log('Success:', res.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <button onClick={makeCall} className='bg-red-500  '>Trigger</button>
    </div>
  );
}

export default Page;
