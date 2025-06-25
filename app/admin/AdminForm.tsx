"use client";

import AdminBroadcastEmail from "@/components/emails/admin-broadcast-email";

import { useEffect, useState } from "react";

// Define the shape of our components
type EmailComponent = {
  id: number;
  type: "text" | "button" | "image" | "link" | "custom-image";
  content: string;
  link?: string; // For buttons
  preset?: "claim" | "referral"; // For special buttons
};

export default function AdminForm() {
  const [components, setComponents] = useState<EmailComponent[]>([]);
  const [subject, setSubject] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const [targetGroup, setTargetGroup] = useState("all");
  const [timeFilter, setTimeFilter] = useState("any");
  const [sendTestUser, setSendTestUser] = useState(false);

  const addComponent = (
    type: "text" | "button" | "image" | "link" | "custom-image",
  ) => {
    const newComponent: EmailComponent = {
      id: Date.now(),
      type,
      content:
        type === "text"
          ? "Start writing your text here..."
          : type === "image"
            ? "N/A"
            : type === "custom-image"
              ? ""
              : "Button Text",
      link: type === "image" || type === "custom-image" ? "N/A" : "https://",
    };
    setComponents([...components, newComponent]);
  };

  const addPresetButton = (preset: "claim" | "referral") => {
    const newComponent: EmailComponent = {
      id: Date.now(),
      type: preset === "referral" ? "link" : "button",
      content:
        preset === "claim" ? "Claim Your Username" : "Get Your Referral Link",
      preset: preset,
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (
    id: number,
    field: keyof EmailComponent,
    value: string,
  ) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, [field]: value } : comp,
      ),
    );
  };

  const removeComponent = (id: number) => {
    setComponents(components.filter((comp) => comp.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending emails...");
    if (sendTestUser) {
      setStatus("Sending to test user email");
      const response = await fetch("/api/admin/send-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          imageUrl,
          components, // Send the array of components
          targetGroup,
          timeFilter,
          sendTestUser: true,
        }),
      });
      const data = await response.json();
      setStatus(data.message);
    } else {
      const response = await fetch("/api/admin/send-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          imageUrl,
          components, // Send the array of components
          targetGroup,
          timeFilter,
          sendTestUser: false,
        }),
      });

      const data = await response.json();
      setStatus(data.message);
    }
  };

  const handleLoadTemplate = async (filename: string) => {
    setSelectedTemplate(filename);
    if (!filename) {
      resetForm();
      return;
    }
    try {
      setStatus(`Loading template: ${filename}...`);
      const response = await fetch(`/api/admin/templates/${filename}`);
      const data = await response.json();
      if (response.ok) {
        // Populate the form state with data from the loaded template
        setSubject(data.subject || "");
        setImageUrl(data.imageUrl || "");
        setComponents(data.components || []);
        setStatus("Template loaded successfully.");
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Failed to load template.");
      console.error(error);
    }
  };
  // New state for template management
  const [templateList, setTemplateList] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [newTemplateName, setNewTemplateName] = useState("");

  // Fetch the list of templates when the component mounts
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/admin/templates");
      const data = await response.json();
      if (response.ok) {
        setTemplateList(data);
      }
    } catch (error) {
      console.error("Could not fetch templates:", error);
    }
  };

  const resetForm = () => {
    setComponents([]);
    setSubject("");
    setImageUrl("");
    setSelectedTemplate("");
  };
  const handleSaveTemplate = async () => {
    if (!newTemplateName) {
      alert("Please enter a name for your template.");
      return;
    }
    setStatus("Saving template...");
    try {
      const templateData = { subject, imageUrl, components };
      const response = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateName: newTemplateName, templateData }),
      });
      const data = await response.json();
      setStatus(data.message);
      if (response.ok) {
        setNewTemplateName("");
        fetchTemplates(); // Refresh the list of templates
      }
    } catch (error) {
      setStatus("Failed to save template.");
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "700px",
        }}
      >
        {/* TEMPLATE MANAGEMENT SECTION */}
        <fieldset
          style={{
            border: "1px solid #0070f3",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <legend>Template Management</legend>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <select
              value={selectedTemplate}
              onChange={(e) => handleLoadTemplate(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">-- Load a Saved Template --</option>
              {templateList.map((filename) => (
                <option key={filename} value={filename}>
                  {filename.replace(".json", "")}
                </option>
              ))}
            </select>
            <button type="button" onClick={resetForm}>
              + New Template
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Enter new template name to save"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              style={{ padding: "8px" }}
            />
            <button type="button" onClick={handleSaveTemplate}>
              Save Template
            </button>
          </div>
        </fieldset>
        <label className="flex flex-col">
          Target Audience:
          <select
            value={targetGroup}
            onChange={(e) => setTargetGroup(e.target.value)}
            className="px-4 py-2 border rounded-md w-full"
          >
            <option value="all">All Users</option>
            <option value="claimed_username">Created a Username</option>
            <option value="not_claimed_username">
              Did Not Create a Username
            </option>
            <option value="not_referred_anyone">
              Users Who Haven't Referred Anyone
            </option>
          </select>
        </label>

        {/* NEW TIME FILTER DROPDOWN */}
        <div>
          <label
            htmlFor="timeFilter"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Joined:
          </label>
          <select
            id="timeFilter"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="any">Any time</option>
            <option value="1">More than 1 day ago</option>
            <option value="3">More than 3 days ago</option>
            <option value="7">More than 7 days ago</option>
            <option value="30">More than 30 days ago</option>
            <option value="90">More than 90 days ago</option>
          </select>
        </div>

        {/* General Settings */}
        <fieldset
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <legend>General Email Settings</legend>
          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ padding: "8px", width: "100%" }}
          />
          <input
            type="url"
            placeholder="Optional Header Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ padding: "8px", width: "100%", marginTop: "10px" }}
          />
        </fieldset>

        {/* Component Builder UI */}
        <div id="component-builder">
          {components.map((comp, index) => (
            <div
              key={comp.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "5px",
                marginBottom: "15px",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => removeComponent(comp.id)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  lineHeight: "20px",
                  textAlign: "center",
                }}
              >
                X
              </button>
              <strong style={{ textTransform: "capitalize" }}>
                {comp.preset ? `${comp.preset} Button` : comp.type}
              </strong>
              {comp.type === "text" ? (
                <>
                  <textarea
                    value={comp.content}
                    onChange={(e) =>
                      updateComponent(comp.id, "content", e.target.value)
                    }
                    style={{
                      minHeight: "100px",
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                    }}
                  />
                  <div style={{ marginTop: "5px" }}>
                    <button
                      type="button"
                      onClick={() =>
                        updateComponent(
                          comp.id,
                          "content",
                          comp.content + " {name}",
                        )
                      }
                      style={{
                        background: "#e0e0e0",
                        border: "1px solid #ccc",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      + Insert User's Name
                    </button>
                  </div>
                </>
              ) : comp.type === "image" ? (
                <></>
              ) : comp.type === "custom-image" ? (
                <div style={{ marginTop: "5px" }}>
                 
                  <input
                    type="url"
                    placeholder="Paste an image URL here"
                    value={comp.content}
                    onChange={(e) => updateComponent(comp.id, "content", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "5px",
                    }}
                  />
                  {(comp.content && (comp.content.startsWith("http://") || comp.content.startsWith("https://"))) && (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={comp.content}
                        alt="Custom upload preview"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : comp.type === "link" ? (
                <></>
              ) : (
                <div style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={comp.content}
                    onChange={(e) =>
                      updateComponent(comp.id, "content", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "5px",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="Button Link"
                    value={comp.link}
                    onChange={(e) =>
                      updateComponent(comp.id, "link", e.target.value)
                    }
                    disabled={!!comp.preset} // Disable link input for presets
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: comp.preset ? "#f0f0f0" : "white",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Component Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderTop: "2px solid #eee",
            paddingTop: "15px",
          }}
        >
          <button type="button" onClick={() => addComponent("text")}>
            + Add Text
          </button>
          <button type="button" onClick={() => addComponent("button")}>
            + Add Button
          </button>
          <button type="button" onClick={() => addPresetButton("claim")}>
            + Add "Claim Username" Button
          </button>
          <button type="button" onClick={() => addPresetButton("referral")}>
            + Add "Referral" Link
          </button>
          <button type="button" onClick={() => addComponent("image")}>
            + Add Founders Gif
          </button>
          <button type="button" onClick={() => addComponent("custom-image")}>
            + Add Custom Image
          </button>
        </div>
        <label htmlFor="sendTestUser">Send Test Emails (Eunice & Naama)</label>
        <input
          type="checkbox"
          onChange={(e) => setSendTestUser(e.target.checked)}
          checked={sendTestUser}
        />
        {sendTestUser ? (
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Send Test Email
          </button>
        ) : (
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Send Emails
          </button>
        )}
      </form>
      {status && <p style={{ marginTop: "20px" }}>{status}</p>}
      <h2>Email Preview</h2>
      <hr />
      <AdminBroadcastEmail
        subject={subject}
        imageUrl={imageUrl}
        previewText={subject}
        processedComponents={components}
      />
    </>
  );
}
