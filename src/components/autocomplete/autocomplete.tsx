import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export interface AutocompleteProps<Item> {
    list: Item[]
    selectedItem: Item | undefined
    displayValue: (item: Item | undefined) => string
    onSelect: (item: Item) => void
}

export default function Autocomplete<Item>({ list, selectedItem, displayValue, onSelect }: AutocompleteProps<Item>) {
    // const [selected, setSelected] = useState(selectedItem)
    const [query, setQuery] = useState('')

    const filteredItems =
        query === ''
            ? list
            : list.filter((item) =>
                  displayValue(item).toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
              )

    const handleSelect = (item: Item) => {
        // setSelected(item)
        onSelect(item)
    }

    return (
        <Combobox value={selectedItem} onChange={handleSelect}>
            <div className="relative mt-1">
                <div className="">
                    <Combobox.Button className="w-full">
                        <Combobox.Input
                            className="input-field input-field-default w-full"
                            displayValue={displayValue}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredItems.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredItems.map((item, index) => (
                                <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-primary-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {displayValue(item)}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-teal-600'
                                                    }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}
