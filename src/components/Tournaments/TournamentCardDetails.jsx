import React from 'react'

export default function TournamentCardDetails() {
    return (
        <div>
            <button type="button" class="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md top-7">
                Inbox
                <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    99+
                    {/* <span class="sr-only">unread messages</span> */}
                </span>
            </button>

        </div>
    )
}
