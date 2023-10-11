'use client'
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Test() {
  return (
    <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button>
            Solutions
            <ChevronDownIcon className={open ? 'rotate-180 transform' : ''} />
          </Popover.Button>
          <Popover.Panel>
            <a href="/insights">Insights</a>
            <a href="/automations">Automations</a>
            <a href="/reports">Reports</a>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}