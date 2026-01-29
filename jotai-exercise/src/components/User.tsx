// src/components/User.tsx
import { FormEvent, useState } from "react";
import { useAtom } from "jotai";
import {
  firstNameAtom,
  lastNameAtom,
  ageAtom,
  hobbiesAtom,
} from "../atoms/user.atom";

const HOBBY_OPTIONS = ["Gym", "Cooking", "Gaming", "Music", "Hiking"];

export default function User() {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [hobbies, setHobbies] = useAtom(hobbiesAtom);

  // Local form state (so atoms only update on Submit)
  const [formFirst, setFormFirst] = useState(firstName);
  const [formLast, setFormLast] = useState(lastName);
  const [formAge, setFormAge] = useState<number>(age);
  const [formHobbies, setFormHobbies] = useState<string[]>(hobbies);

  const toggleHobby = (hobby: string) => {
    setFormHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setFirstName(formFirst.trim());
    setLastName(formLast.trim());
    setAge(Number.isFinite(formAge) ? formAge : 0);
    setHobbies(formHobbies);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>User (Jotai)</h2>

      {/* Display atoms */}
      <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        <div>
          <strong>First name:</strong> <span>{firstName}</span>
        </div>
        <div>
          <strong>Last name:</strong> <span>{lastName}</span>
        </div>
        <div>
          <strong>Age:</strong> <span>{age}</span>
        </div>
        <div>
          <strong>Hobbies:</strong>{" "}
          <span>{hobbies.length ? hobbies.join(", ") : "None"}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          First name
          <input
            value={formFirst}
            onChange={(e) => setFormFirst(e.target.value)}
            placeholder="e.g. Edgar"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Last name
          <input
            value={formLast}
            onChange={(e) => setFormLast(e.target.value)}
            placeholder="e.g. Rios"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Age
          <input
            type="number"
            value={formAge}
            onChange={(e) => setFormAge(e.target.valueAsNumber)}
            placeholder="e.g. 30"
          />
        </label>

        <fieldset style={{ border: "1px solid #ddd", padding: 12 }}>
          <legend>Hobbies</legend>
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            {HOBBY_OPTIONS.map((hobby) => (
              <label key={hobby} style={{ display: "flex", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formHobbies.includes(hobby)}
                  onChange={() => toggleHobby(hobby)}
                />
                {hobby}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" style={{ padding: "10px 14px" }}>
          Submit (Update Atoms)
        </button>
      </form>
    </div>
  );
}
