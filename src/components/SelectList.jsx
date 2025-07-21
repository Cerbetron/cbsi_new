import { Listbox } from '@headlessui/react'

const options = ["Age", "0-5", "6-12", "13-17", "18+"];
const [selected, setSelected] = useState(options[0]);

<Listbox value={selected} onChange={setSelected}>
  <div className="relative">
    <Listbox.Button className="w-full rounded-xl border px-3 py-2 text-[13px] bg-white text-[#444]">
      {selected}
    </Listbox.Button>
    <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white shadow-lg z-50">
      {options.map((option) => (
        <Listbox.Option
          key={option}
          value={option}
          className="px-3 py-2 text-[13px] hover:bg-blue-100 cursor-pointer"
        >
          {option}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </div>
</Listbox>